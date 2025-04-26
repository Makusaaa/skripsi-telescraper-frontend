export enum RoleEnum{
    SuperAdmin = 0,
    CompanyAdmin = 1,
    User = 2,
}

export const Modules = {
    ManageAlarm: "/manage-alarm",
    ManageChannel: "/manage-channel",
    ManageCompany: "/manage-company",
    ManageCompanyUser: "/manage-company-user",
    ManageCredentialExposure: "/manage-credential-exposure",
    ManageKeywordConfiguration: "/manage-keyword-configuration",
    ManageUser: "/manage-user",
    Login: "/",
}

export const ModuleRoles = {
    [Modules.ManageAlarm]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin, RoleEnum.User ],
    [Modules.ManageCredentialExposure]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin, RoleEnum.User ],

    [Modules.ManageKeywordConfiguration]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin ],
    [Modules.ManageCompanyUser]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin ],
    
    [Modules.ManageChannel]: [ RoleEnum.SuperAdmin ],
    [Modules.ManageCompany]: [ RoleEnum.SuperAdmin ],
    [Modules.ManageUser]: [ RoleEnum.SuperAdmin ],
}