import { searchDocs } from "@/services/api";
import { NextResponse } from "next/server";

import { Message } from "@/app/page";
import cohere from "cohere-ai";
console.log(process.env.COHERE_API_KEY);
process.env.COHERE_API_KEY
  ? cohere.init(process.env.COHERE_API_KEY)
  : console.error("No COHERE_API_KEY found in environment variables");

export const POST = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const initialPrompt = searchParams.get("prompt");
  const pastMessages: Message[] = await req.json().catch((_) => []);
  if (!initialPrompt) {
    return;
  }
  const response = await askAI(pastMessages, initialPrompt);
  if (!response?.body.generations[0].text) {
    return NextResponse.json({
      message: "Sorry, we couldn't process your request. Please try again.",
    });
  }
  console.log(response.body);
  return NextResponse.json({
    message: response.body.generations
      .reduce((acc, current) => `${current.text}\n${acc}`, "")
      .replace("bot: ", ""),
  });
};
async function askAI(
  pastMessages: Message[],
  initialPrompt: string,
  retriesLeft = 2
) {
  const prompt = await buildPrompt(pastMessages, initialPrompt);

  console.log("prompt: ", prompt);
  const response = await cohere
    .generate({
      model: "command",
      prompt,
      max_tokens: 500,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    })
    .catch(console.warn);
  if (!response?.body.generations[0].text && retriesLeft > 0) {
    return askAI(pastMessages.slice(-5), initialPrompt, retriesLeft - 1);
  }
  return response;
}

async function buildPrompt(pastMessages: Message[], initialPrompt: string) {
  const pastMessagesString = pastMessages
    .sort(
      (b, a) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .reduce(
      (acc, current) => `${current.sender}: ${current.content}\n${acc}`,
      ""
    );

  const docs = initialPrompt
    ? (await searchDocs(initialPrompt).catch((_) => [])) || []
    : [];

  const historyContext = pastMessages.length
    ? `This is the chat history, you are tagged as "robot":\n ${pastMessagesString}`
    : undefined;

  const docsContext =
    docs?.length > 0
      ? `This is some knowledge base: ${docs.join("\n ")}}`
      : undefined;

  const prompt = [
    `Provide a natural and intelligent response to "${initialPrompt}".`,
    historyContext,
    docsContext,
  ]
    .filter((x) => !!x && x.length > 2)
    .join("\nand\n");
  return prompt;
}
