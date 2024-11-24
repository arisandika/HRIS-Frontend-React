/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { VersionSwitcher } from "@/components/ui/version-switcher";
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
import {
  CalendarCheck,
  CalendarClock,
  CalendarPlus2,
  HandCoins,
  Home,
  IdCard,
  ReceiptText,
  SquareUserRound,
  UsersRound,
  Wallet,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";

const data = {
  profiles: ["Add an existing account"],
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: Home,
        },
      ],
    },
    {
      title: "Menu Karyawan",
      url: "#",
      items: [
        {
          title: "Karyawan",
          url: "/admin/karyawan",
          icon: UsersRound,
        },
        {
          title: "Jabatan",
          url: "/admin/jabatan",
          icon: SquareUserRound,
        },
        {
          title: "Divisi",
          url: "/admin/divisi",
          icon: IdCard,
        },
      ],
    },
    {
      title: "Menu Absensi",
      url: "#",
      items: [
        {
          title: "Absensi",
          url: "#",
          icon: CalendarCheck,
        },
        {
          title: "Izin",
          url: "#",
          icon: CalendarPlus2,
        },
        {
          title: "Lembur",
          url: "#",
          icon: CalendarClock,
        },
      ],
    },
    {
      title: "Menu Penggajian",
      url: "#",
      items: [
        {
          title: "Slip Gaji",
          url: "#",
          icon: Wallet,
        },
        {
          title: "Tunjangan",
          url: "#",
          icon: HandCoins,
        },
        {
          title: "Pajak",
          url: "#",
          icon: ReceiptText,
        },
      ],
    },
  ],
};

export function AppSidebar({ user, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          user={user}
          name={user?.employee?.full_name || user?.email}
          handleLogout={handleLogout}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.url}>
                          {item.icon && <item.icon />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
