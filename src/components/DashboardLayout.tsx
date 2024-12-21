import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";

const { Header, Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const { mutate: handleLogout } = useLogout();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/blogs">Blogs</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            <Button type="link" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "16px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
