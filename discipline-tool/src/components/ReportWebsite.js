import {Input, Form, Button, Layout, Divider, Typography, message, Select} from "antd";
import { LeftSquareOutlined } from '@ant-design/icons';
import { goBack } from "react-chrome-extension-router";
import React, { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./ReportWebsite.css";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text} = Typography;


function ReportWebsite() {

  const form = useRef();

  const [website, setWebsite] = useState(null);
  const [title, setTitle] = useState({title: "Report Website", explanation: "Website that is blocked or not blocked as intended"})
  const [reason, setReason] = useState(null);
  const [reasonLabel, setReasonLabel] = useState(null);
  const [otherReason, setOtherReason] = useState(null);
  const [isDisplay, setIsDisplay] = useState('none');

  const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions).then((tab) => {
      console.log("success")
      var value = tab[0].url.replace(/^https?:\/\//, '');
      value = "https://" + value.slice(0, value.indexOf("/"));    
      setWebsite(value);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCurrentTab();
  }, []);

  const onClick = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”
    console.log(website)
    console.log(reasonLabel)

    emailjs.sendForm('service_9odvcfp', 'template_p5cfncx', form.current, 'HbdmFGLGyFMe2Ffju')
      .then((result) => {
        message.success("Your report is sent")
      }, (error) => {
        message.error("Some error occur")
      }); 
  }

  const options = [
    {
      value: 0,
      label: 'Inappropriate Website NOT being Blocked'
    },
    {
      value: 1,
      label: 'Appropriate Website being Blocked'
    },
    {
      value: 2,
      label: 'Inappropriate Keywords Suggestion'
    },
    {
      value: 3,
      label: 'Other'
    }
  ]

  const calDisplay = (value) => {
    return value == 3 ? "block" : "none"
  }

  const calTitle = (value) => {
    if (value == 2) {
      setWebsite(null);
      return {title: "Inappropriate Keywords", explanation: "Keywords on each website are analyzed for automatic detection"}
    } else {
      getCurrentTab();
      return {title: "Report Website", explanation: "Website that is blocked or not blocked as intended"}
    }
  }
  
  const calReasonLabel = (value) => {
    for(const option of options) {
      if (option.value == value) {
        return option.label;
      }
    }
  }

  return(
    <>
      <Layout>
        <Content>
          <LeftSquareOutlined onClick={() => {goBack()}} style={{marginLeft: "22px", marginTop: "27px", scale: "1.5", color: "#5a5c5b"}}/>
          <Text style={{marginLeft: "10px", fontSize: "17px", marginTop: "27px", color: "#5a5c5b", fontWeight: "bold"}}>Return</Text>
          <Divider/>
            <div style={{marginLeft: "20px"}}>
              <div style={{marginRight: "20px"}}>
                <Text style={{fontSize:"12px", paddingRight: "10px"}}>{title.title}</Text>
                <Text style={{fontSize:"10px", display:"block", color: "#5b5c5b"}}>{title.explanation}</Text>
                <Input style={{marginTop: "5px", fontSize: "10px"}} allowClear size="small" onChange={(e) => {setWebsite(e.target.value)}} value={website}/>
              </div>
              <div style={{paddingTop: "15px"}}>
                <Text style={{fontSize:"12px", paddingRight: "10px"}}>Reason:</Text>
                <Select options={options} size="small" style={{width: "305px"}} onChange={(e) => {setReason(e); setIsDisplay(calDisplay(e)); setTitle(calTitle(e)); setReasonLabel(calReasonLabel(e))}}></Select>
              </div>
              <div style={{paddingTop: "15px", display: isDisplay}}>
                <Text style={{fontSize:"12px", paddingRight: "10px"}}>Other:</Text>
                <Input style={{fontSize: "10px", width: "315px"}} onChange={(e) => {setOtherReason(e.target.value)}} allowClear size="small"/>
              </div>
              <div style={{paddingTop: "15px", paddingBottom: "20px"}}>
                <Button
                  style={{fontSize:"12px"}}
                  type="primary"
                  size="small"
                  onClick={onClick}
                >
                  Submit
                </Button>
              </div>
            </div>
        </Content>
      </Layout>
      <form style={{display: "none"}} ref={form}>
        <input type="text" name="website" value={website} />
        <input type="text" name="reason" value={reasonLabel} />
        <input type="text" name="otherReason" value={otherReason} />
      </form>
    </>     
  )
}



export default ReportWebsite;