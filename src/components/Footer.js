import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, InputGroup, FormControl} from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
            <footer className="text-center text-lg-start bg-white text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
                <Row style={{textAlign:'center'}}>
                    <Col xs={6} md={3} >
                        <div>ABOUT US</div>
                        <div >
                            <ul style={{listStyleType:'none', padding:'0', margin:'0'}}>
                                <li><a >Contact</a></li>
                                <li>Stores</li>
                                <li>Our Story</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={6} md={3}>
                        <div>CUSTOMER SERVICE</div>
                        <p>Business Registration No. 0315840235 issued on 09/08/2019 by department of Planning and Investment HCMC</p>
                        <p>562/16/1 Quang Trung, Ward 11, Go Vap District, HCMC</p>
                        <p>(+84) 909 408 169</p>
                        <p>support@libe.clothing</p>

                    </Col>
                    <Col xs={6} md={3}>
                        <div>PAYMENT METHOD</div>
                    </Col>
                    <Col xs={6} md={3}>
                        <div>SUBSCRIBE TO US</div>
                        <div>
                            <p>Sign up to receive LIBÉ’s new arrival updates, sales, exclusive content, events and more!</p>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">SUBMIT</InputGroup.Text>
                                <FormControl
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                    
                    
            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>Copyright © 2021 THE HANGER</div>
        </footer>
        );
    }
}

export default Footer