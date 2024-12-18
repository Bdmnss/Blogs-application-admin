import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login/Login";
import BlogsTable from "./pages/BlogsTable";
import UsersTable from "./pages/UsersTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<div>Welcome to the Dashboard</div>} />
          <Route path="blogs" element={<BlogsTable />} />
          <Route path="users" element={<UsersTable />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
