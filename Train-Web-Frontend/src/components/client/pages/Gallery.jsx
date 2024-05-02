import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Accordion from "react-bootstrap/Accordion";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style.scss";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export function SwiperTag() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="slide">
          <img src="src/assets/images/slide-1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src="src/assets/images/slide-2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          {" "}
          <img src="src/assets/images/slide-3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          {" "}
          <img src="src/assets/images/slide-4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          {" "}
          <img src="src/assets/images/slide-1.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default function Gallery() {
  return (
    <>
    <SwiperTag/>
      <div className="container">
        <h1 className="gallery-headings mini-heading">Gallery</h1>
        <div className="gallery-main-container">
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g1.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g2.jpg" alt="" />
          </div>

          <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g3.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g4.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g5.jpg" alt="" />
          </div>
          {/* <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g12.jpg" alt="" />
          </div> */}
          <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g20.jpeg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g7.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g8.jpg" alt="" />
          </div>
          <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g13.jpeg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g10.webp" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g11.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g6.jpg" alt="" />
          </div>

          <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g15.JPG" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g14.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g9.jpg" alt="" />
          </div>
          {/* <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g20.jpeg" alt="" />
          </div> */}
          <div className="gallery-image-container tall">
            <img src="src/assets/gallery/g12.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g16.jpeg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g17.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g19.jpg" alt="" />
          </div>
          <div className="gallery-image-container">
            <img src="src/assets/gallery/g21.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

