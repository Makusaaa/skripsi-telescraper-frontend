"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getCredentialExposureList() {
    return await FetchAPI("GET","/credentialexposure");
}

export async function updateCredentialExposureStatus(input: { credentialexposureid: number, status: number }) {
    return await FetchAPI("PATCH","/credentialexposure", {
        credentialexposureid: input.credentialexposureid,
        status: input.status,
    });
}