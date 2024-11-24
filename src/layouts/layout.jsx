/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { AppSidebar } from "../components/ui/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Separator } from "../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { SearchForm } from "../components/ui/search-form";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import Cookies from "js-cookie";

function Layout({ children }) {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // init state user
  const [user, setUser] = useState([]);

  // useEffect
  useEffect(() => {
    // get user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={{ ...user }} />
      <SidebarInset>
        <header className="flex items-center justify-between h-20 gap-2 px-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const pathUrl = `/${pathSegments
                    .slice(0, index + 1)
                    .join("/")}`;

                  return (
                    <Fragment key={segment}>
                      <BreadcrumbItem>
                        {index === 0 && segment === "admin" ? (
                          <Link to={"/admin/dashboard"}>
                            <Home className="w-4 h-4" />
                          </Link>
                        ) : (
                          <Link to={pathUrl}>
                            <BreadcrumbPage>
                              {segment.charAt(0).toUpperCase() +
                                segment.slice(1)}
                            </BreadcrumbPage>
                          </Link>
                        )}
                      </BreadcrumbItem>
                      {index < pathSegments.length - 1 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <SearchForm />
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
