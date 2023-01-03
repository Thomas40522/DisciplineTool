import {Input, Form, Button, Layout, Divider, Typography, message} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text} = Typography;

const userSitesAddress = "http://localhost:3050/sites";

function AddWebsite() {
  return(
    <>
      <Layout>
        <Content>
          <Title level={5} style={{textAlign: "center"}}>Add Websites to be Blocked</Title>
            <Divider/>
              <Form
                style={{paddingLeft: "20px", paddingRight: "20px"}}
                onFinish={onClick}
              >
              <Form.Item
                name="website"
                rules={[
                  {
                    required: true,
                    message: "This field could not be empty!"
                  },
                  {
                    type: 'url',
                    warningOnly: false,
                    message: "Please enter a valid url!"
                  }
                ]}
              >
                <Input allowClear/>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>     
  )
}

async function onClick(value) {
  value = value.website.replace(/^https?:\/\//, '');
  value = value.slice(0, value.indexOf("/"));
  if(value.includes("www.")) {
    var subdomain = "www";
  } else {
    var subdomain = null;
  }
  var newSite = {
    "domain": value,
    "subdomain": subdomain
  }
  if (await postSiteInfo(newSite)) {
    message.success('Submit success!');
  } else {
    message.success('Submit success!');
  }
}

async function postSiteInfo(newSite) {
  let response = await fetch(userSitesAddress);
  let siteInfos = await response.json();
  for (const siteInfo of siteInfos) {
    if (newSite.domain.includes(siteInfo.domain)) {
      return false;
    }
  }
  fetch(userSitesAddress, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSite),
  }).then((result) => {
    console.log(result)
    return true;
  })
  .catch((error) => {
    console.log('Error:', error)
  })
}


export default AddWebsite;