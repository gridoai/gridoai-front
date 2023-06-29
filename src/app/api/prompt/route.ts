import { DocResponse, searchDocs } from "@/services/api";
import { NextResponse } from "next/server";

import { generateResponseVertex } from "@/services/vertex-ai";
import { Message } from "@/types/Message";
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
  const [response, sources]: [string, DocResponse[]] = await askAI(
    pastMessages,
    initialPrompt
  ).catch((e) => e);

  if (!response || typeof response !== "string") {
    console.error("res", response);
    return NextResponse.json({
      message: "Sorry, we couldn't process your request. Please try again.",
    });
  }
  return NextResponse.json({
    message: response.replace("robot:", "").replace("bot:", ""),
    sources: sources,
  });
};

async function askAI(
  pastMessages: Message[],
  initialPrompt: string,
  retriesLeft = 2
) {
  const messages = pastMessages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const [docsCtx, docs] = await makeDocsCtx(initialPrompt);
  const response = await generateResponseVertex(messages, docsCtx || "");
  if (!response && retriesLeft > 0) {
    return generateResponseCohere(
      await buildPrompt(pastMessages, initialPrompt)
    );
  }
  return [response, docs] as const;
}

async function generateResponseCohere(prompt: string) {
  return (
    await cohere
      .generate({
        model: "command",
        prompt,
        max_tokens: 500,
        temperature: 0.9,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      })
      .catch(console.warn)
  )?.body.generations[0].text;
}

async function buildPrompt(pastMessages: Message[], initialPrompt: string) {
  const pastMessagesString = pastMessages
    .sort(
      (b, a) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .reduce(
      (acc, current) => `${current.type}: ${current.message}\n${acc}`,
      ""
    );

  const historyContext = pastMessages.length
    ? `History section :\n ${pastMessagesString}`
    : undefined;

  const docsContext = await makeDocsCtx(initialPrompt);

  const prompt = [
    docsContext,
    `You are GridoAI, an intelligent chatbot for knowledge retrieval.
    Continue the following conversation in a natural and intelligent way:`,
    historyContext,
  ]
    .filter((x) => !!x && x.length > 2)
    .join("\n");
  return prompt;
}

async function makeDocsCtx(initialPrompt: string) {
  const docs = initialPrompt
    ? (await searchDocs(initialPrompt).catch((_) => [])) || []
    : [];

  const docsContext =
    docs?.length > 0
      ? `
=====================
      Context section: ${docs.reduce(
        (acc, current) =>
          acc +
          `
    file name: ${current.url}
    content: ${current.content}
    uid: ${current.uid}
    `,
        ""
      )}}
=====================
        `
      : undefined;
  return [docsContext, docs] as const;
}
export const runtime = "edge";
