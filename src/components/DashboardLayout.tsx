import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { logout } from "@/supabase/auth";
import { userAtom } from "@/store/atoms";

const { Header, Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/blogs">Blogs</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
