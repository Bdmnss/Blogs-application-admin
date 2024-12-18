import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AuthLayout;
