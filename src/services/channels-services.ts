"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getChannelList() {
    return await FetchAPI("GET","/channels");
}