"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import Link from "next/link"

export function SidebarBreadcrumb(){
  const currentPath: string = usePathname();
  const pathNames: string[] = currentPath.split('/').filter(path => path)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((link: string, index: number) => {
          const href: string = `/${pathNames.slice(0,index + 1).join('/')}`;
          const linkName: string = link.split('-').map((l) => (l[0].toUpperCase()+l.slice(1,l.length))).join(' ');
          const isLastPath: boolean = pathNames.length === index + 1;
          return (
            <div key={index}>
              <BreadcrumbItem>
                {!isLastPath ?
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                  :
                  <BreadcrumbPage>
                    {linkName}
                  </BreadcrumbPage>
                }
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}