const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "lucid-arch-387422";
const MODEL_ID = "chat-bison@001";
import { Message } from "@/types/Message";
import { GoogleAuth } from "google-auth-library";

const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`;
let accessToken = ""; // Store the access token
let tokenExpiration = 0; // Store the token expiration time

async function getAccessToken() {
  if (!accessToken || Date.now() >= tokenExpiration) {
    const credentials = JSON.parse(process.env.GOOGLE_APP_CREDS || "");

    const auth = new GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });

    const client = await auth.getClient();

    // Retrieve the access token
    const tokenResponse = await client.getAccessToken();

    if (tokenResponse.token) accessToken = tokenResponse.token;
    tokenExpiration = tokenResponse.res?.data.expires_in
      ? Date.now() + tokenResponse.res.data.expires_in * 1000 // Convert to milliseconds
      : 0;
  }

  return accessToken;
}

export const generateResponseVertex = async (
  messages: Message[],
  extraContext: string
) => {
  const data = {
    instances: [
      {
        context: `You are GridoAI, an intelligent chatbot for knowledge retrieval. ${extraContext} \nProvide a single response to the following conversation in a natural and intelligent way`,
        examples: [],
        messages: [
          // {
          //   author: 'user',
          //   content: 'What is your name?'
          // }
          ...messages.map((message) => ({
            author: message.type === "userMessage" ? "user" : "bot",
            content: message.message,
          })),
        ],
      },
    ],
    parameters: {
      temperature: 0.2,
      maxOutputTokens: 512,
      topP: 0.8,
      topK: 10,
    },
  };
  console.log(JSON.stringify(data, null, 2));
  const headers = {
    Authorization: `Bearer ${await getAccessToken()}`,
    "Content-Type": "application/json",
  };
  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response data
      console.log(JSON.stringify(result, null, 2));
      return result.predictions[0]?.candidates[0]?.content;
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
};