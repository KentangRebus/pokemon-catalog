import React from "react";
import { Layout } from "antd";

import PdHead from "./PdHead";
import PdSidebar from "./PdSidebar";

const { Header, Content } = Layout;

const PdLayout = ({ children }) => {
  return (
    <>
      <PdHead></PdHead>
      <Layout style={{ minHeight: "100vh" }}>
        <PdSidebar />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default PdLayout;
