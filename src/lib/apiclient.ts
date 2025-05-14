/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"
import { cookies } from "next/headers";
import status from "http-status"

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
        if(!resp.ok){
            if(resp.status == status.UNAUTHORIZED){
                (await cookies()).delete("next-auth.session-token")
            }
            else if(resp.status == status.BAD_REQUEST){
                throw new Error((await resp.json()).error);
            }
            else if(resp.status == status.INTERNAL_SERVER_ERROR){
                console.error(`HTTP error! status: ${resp.status}`);
                throw new Error("Server Internal Error!");
            }
            else if(resp.status == status.NOT_FOUND){
                console.error(`HTTP error! status: ${resp.status}`);
                throw new Error("Endpoint Not Found!");
            }
        }
        return await resp.json();
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
    id_token: string,
    role: number,
    name: string,
    email: string,
    companyid: string | null,
    userid: string,
}

export async function getSession() {
    return await getServerSession(authOptions) as unknown as Session
}