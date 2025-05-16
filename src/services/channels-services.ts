"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getChannelList() {
    return await FetchAPI("GET","/channels");
}

export async function leaveChannel(channelid: string) {
    return await FetchAPI("DELETE","/channels", { channelid: channelid });
}

export async function joinChannel(input: {
    channeluserid: string,
}) {
    if(!input.channeluserid) throw new Error("Telegram Channel ID is empty!")
    return await FetchAPI("POST","/channels", {
        channelid: input.channeluserid,
    });
}