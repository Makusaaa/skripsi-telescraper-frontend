"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getAlarmList() {
    return await FetchAPI("GET","/alarms");
}

export async function updateAlarmStatus(input: { alarmid: string, status: number }) {
    return await FetchAPI("PATCH","/alarms", {
        alarmid: input.alarmid,
        status: input.status,
    });
}

export async function updateAlarmAssignTo(input: { alarmid: string, assignto: number | null }) {
    return await FetchAPI("PATCH","/alarms/assign", {
        alarmid: input.alarmid,
        assignto: input.assignto,
    });
}