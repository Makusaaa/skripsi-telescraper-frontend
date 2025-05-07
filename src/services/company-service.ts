"use server"
import { FetchAPI } from "@/lib/apiclient";

export async function getCompanyList() {
    return await FetchAPI("GET","/company");
}

export async function deleteCompany(companyid: string) {
    return await FetchAPI("DELETE","/company", { id: companyid });
}

export async function addCompany(input: {companyname: string, email: string, fullname: string}) {
    if(!input.companyname) throw new Error("Company Name is empty!")
    if(!input.email) throw new Error("Email is empty!")
    if(!input.fullname) throw new Error("Fullname is empty!")
    return await FetchAPI("POST","/company", {
        companyname: input.companyname,
        email: input.email,
        fullname: input.fullname
    });
}