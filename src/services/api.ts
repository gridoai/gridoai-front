import axios from "axios"


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api'
})

type PromptResponse = {
    message: string
}

export const promptApi =async (prompt: string) => (await api.get<PromptResponse>('/prompt', {
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        prompt
    }
})).data