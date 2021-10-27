import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apis, { endpoints } from "../configs/Apis";
import CategoryCard from "./SingleCategory";
import { Container } from "@mui/material";
import { Row } from "react-bootstrap";

export default function ShowCategory(){
    let [categories, SetCategories] = useState([])
    useEffect(async()=>{
        try{
            let res = await Apis.get(endpoints['categories'])
            SetCategories(res.data.results)
        }catch(ex){
            console.error(ex)
        }
        
    })
    
    return(
        <Container>
            <Row className="row d-inline-flex">
            {categories.map((item, i)=><CategoryCard key={i} item={item}></CategoryCard>)}
            </Row>
        </Container>
    )

}