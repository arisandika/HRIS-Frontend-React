import * as React from "react";
import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "./badge";

export function VersionSwitcher({
  user,
  name,
  handleLogout,
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
            >
              <div className="flex items-center justify-center rounded-full aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                <UserRound className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            <div className="p-4 mb-3 rounded-md">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-2 rounded-full aspect-square size-12 bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserRound className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">
                  {user?.employee?.full_name}
                </h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <div className="flex flex-row mt-4 space-x-2">
                  <Badge className="w-auto">
                    {user?.employee?.name_department}
                  </Badge>
                  <Badge className="w-auto">
                    {user?.employee?.name_division}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mb-4 border-t"></div>
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
