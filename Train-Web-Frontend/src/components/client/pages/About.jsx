import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style.scss";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function About() {
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
          <img src="src/assets/images/s2.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s6.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s4.jpg" alt="" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src="src/assets/images/s13.jpg" alt="" />{" "}
        </SwiperSlide>
      </Swiper>

      <div
        style={{ maxWidth: 1200, margin: "auto", padding: "2rem 0" }}
        className="para"
      >
        <h1 className="gallery-headings mini-heading">About Us</h1>

        <p className="leading-8" style={{ textAlign: "center" }}>
          {" "}
          Welcome to the Sri Lanka Railway website, where we invite you to
          embark on a captivating journey through the heart of Sri Lanka's
          landscapes, history, and culture. As the oldest railway system in
          South Asia, our railways have been weaving through lush greenery,
          picturesque countryside, and bustling cityscapes since 1864,
          connecting communities and facilitating travel experiences like no
          other. From the majestic mountains of the central highlands to the
          tranquil shores of the Indian Ocean, our railway network traverses a
          tapestry of breathtaking scenery that reflects the unparalleled beauty
          of our island nation. Each journey with Sri Lanka Railway is not
          merely a transportation experience but a voyage through time, where
          the echoes of bygone eras mingle with the vibrant pulse of modern
          life.
        </p>
      </div>
      <CardGroup style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/b5.avif"
            className="aspect-[6/7]"
          />
          <Card.Body>
            <Card.Title className="text-center mb-3 text-[1.2rem] font-extrabold ">
              A Legacy of Connectivity and Progres
            </Card.Title>
            <Card.Text className="leading-8">
              At Sri Lanka Railway, we take pride in our rich heritage, which
              spans over a century and a half. From the days of British colonial
              rule to the present, our railways have played a pivotal role in
              shaping the nation's development and fostering connections between
              diverse regions and people. As we continue to modernize and expand
              our network, we remain committed to preserving our heritage while
              embracing innovation and sustainability.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/b1.avif"
            className="aspect-[6/7]"
          />
          <Card.Body>
            <Card.Title className="text-center mb-3 text-[1.2rem] font-extrabold ">
              {" "}
              Destinations Along the Rails
            </Card.Title>
            <Card.Text className="leading-8">
              Immerse yourself in the breathtaking beauty of Sri Lanka's diverse
              landscapes as you journey with us across the island. From the
              misty hills of Nuwara Eliya to the golden beaches of Galle, our
              railway routes offer a kaleidoscope of scenic delights waiting to
              be discovered. Whether you're a nature enthusiast, a history buff,
              or simply seeking adventure, there's something for everyone aboard
              our trains.{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/b3.avif"
            className="aspect-[6/7]"
          />
          <Card.Body>
            <Card.Title className="text-center mb-3 text-[1.2rem] font-extrabold ">
              Services and Amenities
            </Card.Title>
            <Card.Text className="leading-8">
              Sit back, relax, and enjoy the journey as we take care of all your
              travel needs. From comfortable seating and onboard dining options
              to convenient booking facilities and friendly staff, we strive to
              ensure that your experience with Sri Lanka Railway is nothing
              short of exceptional. Whether you're traveling for business or
              pleasure, our commitment to quality service remains unwavering.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/b6.avif"
            className="aspect-[6/7]"
          />
          <Card.Body>
            <Card.Title className="text-center mb-3 text-[1.2rem] font-extrabold ">
              Sustainability and Community Engagement
            </Card.Title>
            <Card.Text className="leading-8">
              As stewards of the environment and champions of social
              responsibility, we are dedicated to promoting sustainability and
              making a positive impact on the communities we serve. Through
              initiatives such as waste reduction, eco-friendly practices, and
              community outreach programs, we aim to create a brighter future
              for generations to come. Join us in our journey towards a more
              sustainable and inclusive railway system for all.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>

    </>
  );
}
