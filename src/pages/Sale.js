import { Container } from '@mui/material';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Apis, { endpoints } from "../configs/Apis";
import '../components/searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import SelectPrice from '../components/SelectPrice';
import SelectCategory from '../components/SelectCategory';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { faShoppingBasket, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Sale(){
    let [sale, SetNewProducts] = useState([{}])
    useEffect(async()=>{
        try{
            let res = await Apis.get(endpoints['sale'])
        SetNewProducts(res.data.results)
        }catch(ex){
            console.error(ex)
        }
        
    })
    return(
        <Container style={{paddingTop: '100px'}}>
            <h1 style={{textAlign:'center'}}>SALE</h1>
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
            <form className="search-form" action="">
                <input className="search-input" type="search" placeholder="Search here ..." />
                <i className="fa fa-search"><SearchIcon/></i>
            </form>
            <Row>
                <Col md={3}>
                    <span style={{textAlign:'center'}}>FILTER</span>
                    <hr className="mx-0 px-0" />
                    <div>
                        <SelectPrice />
                        <SelectCategory />
                    </div>
                </Col>
                <Col md={9}>
                    <Row>
                        {sale.map( (item, i) =><Col md={4}><GetProductSale key={i} item={item}></GetProductSale></Col>)}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

function GetProductSale(props){
    return(
        <Card sx={{ margin:"5px"}}>
            <div style={{height:'220px'}}><CardMedia
                component="img"
                alt="green iguana"
                height="100%"
                width="100%"
                image= {props.item.image}
            /></div>
            <CardContent>
                <Typography noWrap variant="body2" color="#185137" title={props.item.name} alignContent="center" textAlign="center" style={{textTransform:"uppercase"}}>
                {props.item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Row>
                        <Col style={{textDecorationLine:'line-through'}}>{props.item.price}&ensp;VNĐ</Col>
                        <Col style={{color:'#FF0000'}}>{props.item.final_price}&ensp;VNĐ</Col>
                    </Row>
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'space-around'}} className="action">
                <Row >
                <Col><Button size="small">(Buy)&ensp;<FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon></Button></Col>
                <Col><Button size="small">(Rate)&ensp;<FontAwesomeIcon icon={faStar}></FontAwesomeIcon></Button></Col>
                </Row>
            </CardActions>
        </Card>
    )
}