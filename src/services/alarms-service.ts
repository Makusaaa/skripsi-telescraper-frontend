"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getAlarmList() {
    return await FetchAPI("GET","/alarms");
}