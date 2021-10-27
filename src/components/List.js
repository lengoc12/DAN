import Slider from "react-slick";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apis, { endpoints } from "../configs/Apis";
import "./banner.css"

export default function ListItem(){
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        dots: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 2
    };
    return(
        <div className="container" style={{paddingTop:'30px'}}>
            <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
			<style>{cssstyle}</style>
            <div style={{width:'100%', height:'300px'}}>
                <Slider {...settings}>
                    <div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
					<div>
						<h3>7</h3>
					</div>
					<div>
						<h3>8</h3>
					</div>
					<div>
						<h3>9</h3>
					</div>
					<div>
						<h3>10</h3>
					</div>
					<div>
						<h3>11</h3>
					</div>
					<div>
						<h3>12</h3>
					</div>
					<div>
						<h3>13</h3>
					</div>
					<div>
						<h3>14</h3>
					</div>
					<div>
						<h3>15</h3>
					</div>
					<div>
						<h3>16</h3>
					</div>
                </Slider>
            </div>
        </div>
    )
}

const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`