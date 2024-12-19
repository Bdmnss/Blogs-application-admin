import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login/Login";
import BlogsTable from "./pages/BlogsTable/BlogsTable";
import AddBlog from "./pages/BlogsTable/components/AddBlog";
import EditBlog from "./pages/BlogsTable/components/EditBlog";
import UsersTable from "./pages/UsersTable/UsersTable";
import AddUser from "./pages/UsersTable/components/AddUser";
import EditUser from "./pages/UsersTable/components/EditUser";
import PrivateRoute from "./guards/PrivateRoute";
import RestrictedRoute from "./guards/RestrictedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<RestrictedRoute />}>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<div>Welcome to the Dashboard</div>} />
            <Route path="blogs" element={<BlogsTable />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<EditBlog />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
