import React, { Component } from 'react';
import Slider from "react-slick";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apis, { endpoints } from "../configs/Apis";
import SingleProduct from './Singleproduct';
import "./banner.css";
import { Row, Col } from 'react-bootstrap';
import Headline from './common/HeadLine';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function NewProductSlide() {
    const settings = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 1000,
      initialSlide: 0,
      
    };

    let [newproducts, SetNewProducts] = useState([])
    useEffect(async()=>{
        try{
            let res = await Apis.get(endpoints['newproducts'])
        SetNewProducts(res.data.results)
        }catch(ex){
            console.error(ex)
        }
        
    })
    return (
        <div className="container">
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <style>{cssstyle}</style>
            <Headline title="New" subtitle="Products"/>
            <div><Row>
                <Slider {...settings}>
                    
                        {newproducts.map( (item, i) => <SingleProduct key={i} item={item} /> )}
                    
                </Slider></Row>
            </div>
          <div style={{textAlign:'right'}}>
                <Row>
                    <Col>
                        <Link className='link' href="/sale" color="inherit" underline="none">View All<NavigateNextIcon/>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`
