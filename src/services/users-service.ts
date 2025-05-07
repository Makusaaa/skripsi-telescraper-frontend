"use server"
import { FetchAPI, getSession } from "@/lib/apiclient";
import { RoleEnum } from "@/lib/moduleconstants";

export async function addUser(input: {
    fullname: string,
    email: string,
    role: string,
    companyid: string,
}) {
    if(!input.fullname) throw new Error("Fullname is empty!")
    if(!input.email) throw new Error("Email is empty!")
    if(!input.role) throw new Error("Role is not selected!")
    const session = await getSession();
    if(input.role != RoleEnum.SuperAdmin.toString() && !input.companyid && session.role == RoleEnum.SuperAdmin)
        throw new Error("Company is not selected!")
    return await FetchAPI("POST","/users", {
        fullname: input.fullname,
        email: input.email,
        role: input.role,
        companyid: input.companyid,
    });
}