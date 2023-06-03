import { NextResponse } from "next/server";

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

export const GET = async (req:Request) => {
    const { searchParams } = new URL(req.url);
    console.log(searchParams.values(), searchParams.keys)
    await sleep(200);
    return NextResponse.json({
        message: `You said: ${searchParams.get('prompt')}`
    })
}