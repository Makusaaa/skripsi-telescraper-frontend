import { BookOpen, Bot, LifeBuoy, Send, SquareTerminal } from "lucide-react"

export enum RoleEnum{
  SuperAdmin = 0,
  CompanyAdmin = 1,
  User = 2,
}

export enum StatusEnum{
  Open = 0,
  OnProgress = 1,
  Closed = 2,
}

export const StatusName = {
  [StatusEnum.Open]: "Open",
  [StatusEnum.OnProgress]: "On Progress",
  [StatusEnum.Closed]: "Closed",
}

export const Modules = {
  ManageAlarm: "/manage-alarm",
  ManageChannel: "/manage-channel",
  ManageCompany: "/manage-company",
  ManageCredentialExposure: "/manage-credential-exposure",
  ManageKeywordConfiguration: "/manage-keyword-configuration",
  ManageUser: "/manage-user",
  Login: "/",
}

export const RoleName = {
  [RoleEnum.SuperAdmin]: "Super Admin",
  [RoleEnum.CompanyAdmin]: "Company Admin",
  [RoleEnum.User]: "Company User",
}

export const ModuleRoles = {
  [Modules.ManageAlarm]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin, RoleEnum.User ],
  [Modules.ManageCredentialExposure]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin, RoleEnum.User ],
  
  [Modules.ManageKeywordConfiguration]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin ],
  
  [Modules.ManageUser]: [ RoleEnum.SuperAdmin, RoleEnum.CompanyAdmin ],
  [Modules.ManageCompany]: [ RoleEnum.SuperAdmin ],
  [Modules.ManageChannel]: [ RoleEnum.SuperAdmin ],
}

export const ModuleSidebarItems = {
  user: {
    name: "user",
    email: "user@example.com",
    avatar: "/placeholder-user.webp",
  },
  navMain: [
    {
      title: "Monitoring",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Alarm",
          url: Modules.ManageAlarm,
          roles: ModuleRoles[Modules.ManageAlarm],
        },
        {
          title: "Credential Exposure",
          url: Modules.ManageCredentialExposure,
          roles: ModuleRoles[Modules.ManageCredentialExposure],
        },
        {
          title: "Keyword Configuration",
          url: Modules.ManageKeywordConfiguration,
          roles: ModuleRoles[Modules.ManageKeywordConfiguration],
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "User",
          url: Modules.ManageUser,
          roles: ModuleRoles[Modules.ManageUser],
        },
        {
          title: "Company",
          url: Modules.ManageCompany,
          roles: ModuleRoles[Modules.ManageCompany],
        },
      ],
    },
    {
      title: "Bot Management",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Channels",
          url: Modules.ManageChannel,
          roles: ModuleRoles[Modules.ManageChannel],
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

