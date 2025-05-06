/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function FetchAPI(method: string, endpoint: string, body?: any)
{
    const session = await getSession();
    if(!session) throw new Error("No Session")    
    try
    {
        const res = await fetch(
            `${process.env.API_URL}${endpoint}`,
            {
                method: method,
                headers: {
                    "Authorization": `Bearer ${session.authToken}`,
                    "Content-Type": `application/json`
                },
                body: JSON.stringify(body)
            }
        );
        return await res.json();
    }
    catch
    {
        throw new Error("Fetch failed")
    }
}

export type Session = {
    authToken: string,
    role: number,
    name: string,
    email: string,
}

export async function getSession() {
    return await getServerSession(authOptions) as unknown as Session
}