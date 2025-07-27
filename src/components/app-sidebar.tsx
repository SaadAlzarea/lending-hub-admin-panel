import { Home, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/test",
    icon: Home,
  },
  {
    title: "User List",
    url: "/admin/userList",
    icon: Users,
  },
];

const data = {
  user: {
    fname: localStorage.getItem("fname"),
    lname: localStorage.getItem("lname"),
    email: localStorage.getItem("email"),
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrJwdO6KDjQ2W6zUinWeKtyOTNW3wFqP9iJme1Y_sF9CtwzF5R1--B9uICdwXQPM8Z50&usqp=CAU",
  },
};

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <div className="flex gap-2">
          <div className="h-15 w-15 rounded-md">
              <img src={data.user.avatar} alt="" className="h-15 w-15 rounded-md" />
          </div>
          <div className="flex flex-col justify-center">
              <p className="font-medium">{data.user.fname} {data.user.lname}</p>
              <p className="text-sm text-gray-600">{data.user.email}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
