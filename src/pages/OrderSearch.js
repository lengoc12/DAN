import { Container } from "react-bootstrap";
import '../components/searchbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function OrderSearch(){
    return(
        <Container style={{paddingTop: '100px'}}>
            <h3 style={{textAlign:'center'}}>SEARCH YOUR ORDER</h3>
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
            <form className="search-form" action="">
                <input className="search-input" type="search" placeholder="Order Code..." />
                <i className="fa fa-search"><SearchIcon/></i>
            </form>
            <AllTabs></AllTabs>
        </Container>
        
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

 function AllTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            textColor="secondary" 
            indicatorColor="secondary" >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="New" {...a11yProps(1)} />
            <Tab label="Accepted" {...a11yProps(2)} />
            <Tab label="Preparing" {...a11yProps(3)} />
            <Tab label="On Shipping" {...a11yProps(4)} />
            <Tab label="Completed" {...a11yProps(5)} />
            <Tab label="Canceled" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={3}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={4}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={5}>
            <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={6}>
         <Row>
                <Col>
                    <div>Order code:</div>
                </Col>
                <Col>
                    <div>| Created date:</div>
                </Col>
                <Col>
                    <div>| Staus:</div>
                </Col>
                <Col>
                    <div>| Payment method:</div>
                </Col>
                <Col>
                    <div>| Total:</div>
                </Col>
            </Row>
      </TabPanel>
    </Box>
  );
}