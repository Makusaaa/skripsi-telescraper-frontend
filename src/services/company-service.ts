"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getCompanyList() {
    return await FetchAPI("GET","/company");
}

export async function deleteCompany(companyid: string) {
    return await FetchAPI("DELETE","/company", { id: companyid });
}

export async function addCompany(companyname: string) {
    return await FetchAPI("POST","/company", { name: companyname });
}