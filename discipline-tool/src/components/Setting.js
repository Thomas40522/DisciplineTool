import {Input, Form, Button, Layout, Slider, Divider, Switch, Typography, message } from "antd";
import { SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import ReportWebsite from "./ReportWebsite";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text} = Typography;

function Setting() {

  const getResult = () => {
      chrome.storage.sync.get().then((result) => {
      console.log(result)
      setDetect(result.detect)
      setSensitivity(result.sensitivity)
  })}

  useEffect(() => {
    getResult();
  }, []);

  const [detect, setDetect] = useState(true);
  const [sensitivity, setSensitivity] = useState(10);

  const onClick = () => {
    chrome.storage.sync.set({"detect": detect, "sensitivity": sensitivity})
    .then(() => {
      console.log(detect + sensitivity + "is set")
    })
    .catch((error) => {console.log(error)})
  }

  return (
    <>
      <Layout>
        <Content>
          <SettingOutlined style={{marginLeft: "22px", marginTop: "27px", scale: "1.5", color: "#5a5c5b"}}/>
          <Text style={{marginLeft: "10px", fontSize: "17px", marginTop: "27px", color: "#5a5c5b", fontWeight: "bold"}}>Setting</Text>
          <Divider/>
          <div style={{marginLeft: "20px"}}>
            <div>
              <Text style={{fontSize:"12px", paddingRight: "10px"}}>Auto Detect</Text>
              <Switch size="small" checked={detect} onChange={setDetect}></Switch>
              <Text style={{fontSize:"10px", display:"inline-block", color: "#5b5c5b"}}>Automatically detect whether the website contains inappropriate content</Text>
            </div>
            <div style={{marginRight: "20px", paddingTop: "15px"}}>
              <Text style={{fontSize:"12px", paddingRight: "0px"}}>Sensitivity</Text>
              <Text style={{fontSize:"10px", display:"block", color: "#5b5c5b"}}>How sensitive in detecting inappropriate content</Text>
              <Slider value={sensitivity} autoFocus={true} step={10} onChange={setSensitivity}/>
            </div>
            <div style={{paddingTop: "5px", paddingBottom: "10px"}}>
              <Button
                style={{fontSize:"12px"}}
                size="small"
                onClick={onClick}
              >
                Save Setting
              </Button>
            </div>
            <div onClick={() => {goTo(ReportWebsite)}} style={{paddingBottom: "20px", fontSize:"10px", textDecoration: "underline", color: "blue", cursor: "pointer"}}>
              Report Website
            </div>
          </div>          
        </Content>
      </Layout>
    </>
  )
}


export default Setting;