import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import {Col, Row} from 'react-bootstrap'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import StarRateIcon from '@mui/icons-material/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./banner.css"
import { faShoppingBasket, faStar } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard(props) {
    let path = `/categories/${props.obj.id}/products/`
    if (props.type === "product")
        path = `/products/${props.obj.id}`

  const discount = props.item.discount;
  if (discount!==0){
    return(
      <Col>
      <Link to={path}>
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
        </Link>
      </Col>
    )
  }
  else{
    return(

      <Col>
      <Link to={path}>
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
            <Typography variant="body2" color="text.secondary" >
                <Row style={{textAlign:'center'}}>
                    <Col>{props.item.price}&ensp;VNĐ</Col>
                </Row>
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent:'space-around'}} className="action">
            <Row >
              <Col><Button size="small">(Buy)&ensp;<AddShoppingCartIcon/></Button></Col>
              <Col><Button size="small">(Rate)&ensp;<StarRateIcon/></Button></Col>
            </Row>
          </CardActions>
        </Card>
        </Link>
      </Col>
    )
  }
}
