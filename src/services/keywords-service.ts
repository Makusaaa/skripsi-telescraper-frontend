"use server"
import { FetchAPI, getSession } from "@/lib/apiclient";
import { RoleEnum } from "@/lib/moduleconstants";

export async function getKeywordList() {
    return await FetchAPI("GET","/keywords");
}

export async function deleteKeyword(keywordid: string) {
    return await FetchAPI("DELETE","/keywords", { keywordid: keywordid });
}

export async function addKeyword(input: {
    keyword: string,
    companyid: string,
}) {
    if(!input.keyword) throw new Error("Keyword is empty!")
    const session = await getSession();
    if(!input.companyid && session.role == RoleEnum.SuperAdmin) throw new Error("Company is not selected!")
    
    return await FetchAPI("POST","/keywords", {
        keyword: input.keyword,
        companyid: input.companyid,
    });
}