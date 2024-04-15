import Carousel from "react-bootstrap/Carousel";

function Hero() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/food-pic-6.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Simple Salad</h5>
          <p>Egg, tomato, radish and avocado salad just waiting to be made.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/food-pic-1.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Perfect Platter</h5>
          <p>An array of meat, cheese and fruits to get you on your way.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/food-pic-7.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Something Sweet</h5>
          <p>Quick and easy sweet treat for when you deserve it.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/food-pic-5.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Breakfast Beauty</h5>
          <p>Simple start to your day to fuel your energy right.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;
