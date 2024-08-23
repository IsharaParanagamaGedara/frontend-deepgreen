import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../assets/styles/LandingPage.css';

const testimonials = [
  {
    image: require('../assets/images/testimonial1.jpg'),
    quote: "DeepGreen has been a game-changer for our farm. The disease detection is spot on!",
    name: "Gamini Dissanayake"
  },
  {
    image: require('../assets/images/testimonial2.jpg'),
    quote: "Thanks to DeepGreen, we have saved countless crops from disease.",
    name: "Dinesh Priyantha"
  },
  {
    image: require('../assets/images/testimonial3.jpg'),
    quote: "The accuracy and speed of DeepGreen's predictions are impressive!",
    name: "Nuwan Herath"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <OwlCarousel
        id="customers-testimonials"
        className="owl-carousel owl-theme"
        loop
        center
        items={3}
        margin={0}
        autoplay
        dots
        autoplayTimeout={8500}
        smartSpeed={450}
        responsive={{
          0: { items: 1 },
          768: { items: 2 },
          1170: { items: 3 }
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div className="item" key={index}>
            <div className="shadow-effect">
              <img
                className="img-circle"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <p>{testimonial.quote}</p>
            </div>
            <div className="testimonial-name">{testimonial.name}</div>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default Testimonials;