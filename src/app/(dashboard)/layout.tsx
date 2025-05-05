"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const currentPath: string = usePathname();
    const pathNames: string[] = currentPath.split('/').filter(path => path)
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
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
            </div>
          </header>
          <Separator />
          {children}
        </SidebarInset>
      </SidebarProvider>
    )
  }