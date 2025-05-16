"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getCredentialExposureList() {
    return await FetchAPI("GET","/credentialexposure");
}