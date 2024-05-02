import React from "react";
import { SwiperTag } from "./Gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style.scss";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Offers() {
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
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s16.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s8.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s9.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s10.jpg" alt="" />{" "}
        </SwiperSlide>
      </Swiper>

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <h1 className="gallery-headings mini-heading">Offers</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col mb-3  ">
              <div className="card shadow-sm ">
                <img
                  className="aspect-[4/2]"
                  src="src/assets/images/a15.avif"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold ">
                    Cheers to cheap tickets
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                  Get ready for an adventure with our special discounted
                    fares! Save up to 45%* more cash in your pocket when you
                    book your train tickets at least 4 weeks in advance. It's
                    the perfect opportunity to explore the stunning landscapes
                    and vibrant culture of Sri Lanka.
                    
                  </p>
                  <div className="d-flex justify-content-between align-items-center"></div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="aspect-[4/2]"
                  src="src/assets/images/a14.avif"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold">
                    Rs.500 free with LNER Perks
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                  Download our mobile app and meet our loyalty scheme. Get
                    Rs.500 free when you join. With LNER Perks, enjoy exclusive
                    benefits, including discounted fares, priority boarding,
                    and access to special events. Start saving and start
                    exploring today!
                  </p>
                  <div className="d-flex justify-content-between align-items-center"></div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                 className="aspect-[4/2]"
                  src="src/assets/images/a4.jpeg"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold">
                    Save 1/3 with a Railcard
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                  Unlock incredible savings with a Railcard! Whether you're a
                    frequent traveler, a student, or a senior, there's a
                    Railcard for everyone. Enjoy up to 1/3 off the ticket
                    price on your train journeys across Sri Lanka. Start
                    planning your adventures today!
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <img
                className="aspect-[4/2]"
                  src="src/assets/images/a7.jpeg"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold">
                    Save 20% off for groups of 3-9{" "}
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                  Planning a group trip? Enjoy fantastic savings with our
                    group travel discount! Save 20% off train tickets for
                    groups of 3-9 travelers. Whether you're traveling with
                    family or friends, make the most of your journey together
                    with Sri Lanka Railway.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="aspect-[4/2]"
                  src="src/assets/images/a8.jpeg"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold">
                    Day return ticket, up to 50%
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                  Make the most of your day trip with our special day return
                    ticket offer! If you leave and come back the same day, you
                    could enjoy over 50% discount on your ticket price. Whether
                    you're visiting family, exploring a new city, or attending
                    an event, save big with Sri Lanka Railway.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <img
                  className="aspect-[4/2]"
                  src="src/assets/images/a10.jpg"
                  alt=""
                />
                <div className="card-body ">
                  <h2 className="text-center mb-3 text-[1.2rem] font-bold">
                    Student savings
                  </h2>
                  <p className="card-text  min-h-12 leading-8">
                    Attention students! Save big on your train travel with our
                    student savings offer. Book your train tickets in advance
                    using your 16-25 railcard and enjoy a whopping 50% off the
                    ticket price. Whether you're heading home for the holidays
                    or exploring new destinations.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
