import { useState } from "react";
import Link from "next/link";

import { Col, Layout, Menu, Row } from "antd";
import { DesktopOutlined, CodeSandboxOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const PdSidebar = () => {
  const [selected, setSelected] = useState(["1"]);

  function handleOnMenuSelect({ item, key, keyPath, selectedKeys, domEvent }) {
    console.log({ item, key, keyPath, selectedKeys, domEvent });
    setSelected(selectedKeys);
  }

  return (
    <Sider collapsed={true}>
      <Row align='middle' justify='center'>
        <Col style={{ paddingTop: 15, paddingBottom: 15 }}>
          <img
            src='https://pngimg.com/uploads/pokeball/pokeball_PNG24.png'
            width='50'
            height='50'
          />
        </Col>
      </Row>
      <Menu
        selectedKeys={selected}
        theme='dark'
        mode='inline'
        onSelect={handleOnMenuSelect}>
        <Menu.Item key={"1"} icon={<CodeSandboxOutlined />}>
          <Link href='/'>Pokemon List</Link>
        </Menu.Item>
        <Menu.Item key={"2"} icon={<DesktopOutlined />}>
          <Link href='/me'>My Pokemon List</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default PdSidebar;
