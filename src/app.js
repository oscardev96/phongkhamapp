import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Appointment from "./page/appointment/Appointment";
import Drug from "./page/drug/Drug";
import Home from "./page/home/Home";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./app.css";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function App() {
  const history = useHistory();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible>
        <div className="logo" >
        <span>Phòng khám phụ sản Lục Ngạn</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => history.push("/")}
          >
            Trang chủ
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<VideoCameraOutlined />}
            onClick={() => history.push("/appointment")}
          >
            Danh sách
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UploadOutlined />}
            onClick={() => history.push("/drug")}
          >
            Thuốc
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/appointment">
              <Appointment />
            </Route>
            <Route path="/drug">
              <Drug />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
