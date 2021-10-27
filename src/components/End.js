import 'bootstrap/dist/css/bootstrap.min.css';
import "./banner.css";
import {Col, Row, Container} from 'react-bootstrap';
import Link from '@mui/material/Link';
import SendIcon from '@mui/icons-material/Send';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBillAlt, faPhone, faPhoneAlt, faRetweet, faThumbsUp, faTruck } from '@fortawesome/free-solid-svg-icons';
export default function End(){
    return(
        <>
        <div className="container-fluid justify-content-center">
            <Container>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
                <Row style={{textAlign:'center'}}>
                    <Col className='zoom'>
                        <Link className="link" href="/category" underline="none" color="inherit">
                            <div><FontAwesomeIcon icon={faTruck}></FontAwesomeIcon></div>
                            <div><span>Giao hàng nhanh chóng</span></div>
                        </Link>
                        
                    </Col>
                    <Col className='zoom'>
                        <Link className="link" href="/sale" underline="none" color="inherit">
                            <div><FontAwesomeIcon icon={faMoneyBillAlt}></FontAwesomeIcon></div>
                            <div><span>Thanh toán tiện lợi</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom'>
                        <Link className="link" href="/ordersearch" underline="none" color="inherit">
                            <div><FontAwesomeIcon icon={faPhoneAlt}></FontAwesomeIcon></div>
                            <div><span>Hỗ trợ 24/7</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom'>
                        <Link className="link" href="/topsellsers" underline="none" color="inherit">
                            <div><FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon></div>
                            <div><span>Đổi hàng miễn phí</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom'>
                        <Link className="link" href="/new" underline="none" color="inherit">
                            <div><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></div>
                            <div><span>Chính hãng</span></div>
                        </Link>
                    </Col>
                </Row>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
            </Container>
            
            <div className="row py-5">
                <div className="col">
                    <div className="card border-0 cardfooter">
                        <div className="card-body text-center ">
                            <h2><b>Let `s have a chat !</b></h2>
                            <p className="pl-0 ml-0 mb-5">Find out what we can do for your business or home.</p>
                            <div className="row text-center justify-content-center">
                                <div className="col-auto">
                                    <div className="input-group-lg input-group mb-3 "><input type="text" className="form-control" placeholder="Enter your e-mail address" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <div className="input-group-append"><button className="btn btn-outline-secondary btnsend" type="button" id="button-addon2"> <b><SendIcon></SendIcon></b></button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mx-0 px-0" />
            <footer>
                <div className="row justify-content-around mb-0 pt-5 pb-0 ">
                    <div className=" col-11">
                        <div className="row justify-content-center">
                            <div className="col-md-3 col-12 font-italic align-items-center mt-md-3 mt-4">
                                <h5><b className="text-dark"> The<span className="text-muted"> Hanger</span></b></h5>
                            </div>
                            <div className="col-md-3 col-12 my-sm-0 mt-5">
                                <div>ABOUT US</div>
                                <ul className="list-unstyled">
                                    <li>Intergrated Security Platform</li>
                                    <li>Core Features</li>
                                    <li>Product Features</li>
                                    <li>Pricing</li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-12 my-sm-0 mt-5">
                                <div>CUSTOMER SERVICE</div>
                                <ul className="list-unstyled">
                                    <li>Intergrated Security Platform</li>
                                    <li>Core Features</li>
                                    <li>Product Features</li>
                                    <li>Pricing</li>
                                </ul>
                            </div>
                            <div className="col-xl-auto col-md-3 col-12 my-sm-0 mt-5">
                                <ul className="list-unstyled">
                                    <li className="mt-md-3 mt-4">CUSTOMER SERVICE</li>
                                    <li>Intergrated Security Platform</li>
                                    <li>Core Features</li>
                                    <li>Product Features</li>
                                    <li>Pricing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mx-0 px-0" />
                <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>© 2021 The Hanger. All Rights Reserved.</div>
            </footer>
        </div>
        </>
    )
}