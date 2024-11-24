import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "@/views/auth/register";
import Login from "@/views/auth/login";
import Dashboard from "@/views/admin/dashboard";
import Layout from "@/layouts/layout";
import Employee from "@/views/admin/employee";
import EmployeeCreate from "@/views/admin/employee/create";
import Department from "@/views/admin/department";
import DepartmentCreate from "@/views/admin/department/create";
import Division from "@/views/admin/division";
import DivisionCreate from "@/views/admin/division/create";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/karyawan"
        element={
          isAuthenticated ? (
            <Layout>
              <Employee />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/karyawan/create"
        element={
          isAuthenticated ? (
            <Layout>
              <EmployeeCreate />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/jabatan"
        element={
          isAuthenticated ? (
            <Layout>
              <Department />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/jabatan/create"
        element={
          isAuthenticated ? (
            <Layout>
              <DepartmentCreate />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/divisi"
        element={
          isAuthenticated ? (
            <Layout>
              <Division />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/divisi/create"
        element={
          isAuthenticated ? (
            <Layout>
              <DivisionCreate />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
