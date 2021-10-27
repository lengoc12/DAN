import Slider from "react-slick";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apis, { endpoints } from "../configs/Apis";
import "./banner.css";

export default function Banner(){
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let [slides, SetSlides] = useState([])
    useEffect(async()=>{
        try{
            let res = await Apis.get(endpoints['slides'])
        SetSlides(res.data.results)
        }catch(ex){
            console.error(ex)
        }
        
    })
    return(
        <div className="container" style={{paddingTop:'40px'}}>
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
			<style>{cssstyle}</style>
            <div>
                <Slider {...settings}>
                {
                    slides.map( (item, i) => <GetBanner key={i} item={item} /> )
                }
                </Slider>
            </div>
            <div className="wrapper">
                <div className="searchBar">
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="SUBMIT YOUR SEARCH..." />
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                        <svg style={{width:"24px", height:"24px"}} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

function GetBanner(props){
    return(
        <>
            <div style={{width:'100%', height:'600px'}}>
                <img style={{width:'100%', height:'100%'}} src={props.item.image} className="d-block w-100" alt="..."/>
            </div>
            
            <div className="carousel-caption d-none d-md-block txtelegantshadow">
                <h5>{props.item.caption}</h5>
            </div>
        </>
    )
    
}
const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`