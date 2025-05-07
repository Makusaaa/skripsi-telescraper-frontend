/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"
import { cookies } from "next/headers";

export async function FetchAPI(method: string, endpoint: string, body?: any)
{
    try
    {
        const session = await getSession();
        if(!session) throw new Error("No Session");
        const resp = await fetch(`${process.env.API_URL}${endpoint}`, {
            method: method,
            headers: {
                "Authorization": `Bearer ${session.authToken}`,
                "Content-Type": `application/json`
            },
            body: JSON.stringify(body)
        });
        const result = await resp.json();
        if(!resp.ok){
            if(resp.status == 401){
                (await cookies()).delete("next-auth.session-token")
            }
            if(resp.status == 400){
                throw new Error(result.error);
            }
            if(resp.status == 500){
                console.error(`HTTP error! status: ${resp.status}`);
                throw new Error("Server Internal Error!");
            }
        }
        return result;
    }
    catch(e: any)
    {
        if(e.message == "fetch failed") {
            throw new Error("Fetching fail, server might be down!");
        }
        throw e;
    }
}

export type Session = {
    authToken: string,
    role: number,
    name: string,
    email: string,
    companyid: string | null,
}

export async function getSession() {
    return await getServerSession(authOptions) as unknown as Session
}