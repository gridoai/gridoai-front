import { searchDocs } from "@/services/api";
import { NextResponse } from "next/server";

import cohere from "cohere-ai";
console.log(process.env.COHERE_API_KEY);
process.env.COHERE_API_KEY
  ? cohere.init(process.env.COHERE_API_KEY)
  : console.error("No COHERE_API_KEY found in environment variables");

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const initialPrompt = searchParams.get("prompt");
  if (!initialPrompt) {
    return;
  }
  const docs = initialPrompt
    ? (await searchDocs(initialPrompt).catch((_) => [])) || []
    : [];
  const response = await cohere.generate({
    model: "command-xlarge-nightly",
    prompt: docs?.length
      ? ` From this list of documents: ${docs.map((doc) => ` ${doc}\n`)}\n\n
        Answer the following prompt:
        ${initialPrompt}
        `
      : initialPrompt,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  });
  console.log(response.body);
  return NextResponse.json({
    message: response.body.generations.reduce(
      (acc, current) => `${current.text}\n${acc}`,
      ""
    ),
  });
};
