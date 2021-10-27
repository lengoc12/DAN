import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container,  Col, Row} from 'react-bootstrap';
import SellIcon from '@mui/icons-material/Sell';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StackedLineChartTwoToneIcon from '@mui/icons-material/StackedLineChartTwoTone';
import FiberNewTwoToneIcon from '@mui/icons-material/FiberNewTwoTone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Link from '@mui/material/Link';
import "./banner.css"

export default function Bar(){
    return(
        <>
            <Container  className= "container-fluid">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
                <Row style={{textAlign:'center'}} >
                    <Col className='zoom' sm={6} md={2}>
                        <Link className="link" href="/categories" underline="none" color="inherit">
                            <div><CheckroomIcon/></div>
                            <div><span>Danh mục</span></div>
                        </Link>
                        
                    </Col>
                    <Col className='zoom' sm={6} md={2}>
                        <Link className="link" href="/sale" underline="none" color="inherit">
                            <div><SellIcon/></div>
                            <div><span>Sale</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom' sm={6} md={2}>
                        <Link className="link" href="/ordersearch" underline="none" color="inherit">
                            <div><ManageSearchIcon/></div>
                            <div><span>Tra cứu đơn hàng</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom' sm={6} md={2}>
                        <Link className="link" href="/topsellsers" underline="none" color="inherit">
                            <div><StackedLineChartTwoToneIcon/></div>
                            <div><span>Bán chạy</span></div>
                        </Link>
                    </Col>
                    <Col className='zoom' sm={6} md={2}>
                        <Link className="link" href="/new" underline="none" color="inherit">
                            <div><FiberNewTwoToneIcon/></div>
                            <div><span>Sản phẩm mới</span></div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}