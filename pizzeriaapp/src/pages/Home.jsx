import React from "react";
import "./Home.css";
import ingredientsImg from "../assets/ingredients.png";
import deliveryImg from "../assets/delivery.png";

const Home = () => {
  return (
    <div className="home-container">

      {/* OUR STORY */}
      <section className="home-section center">
        <h1>Our story</h1>

        <p className="intro-text">
          We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page.
          Fans were given situations where they had to come up with wacky and fun excuses.
        </p>

        <p className="intro-text">
          Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist
          the softest, cheesiest, crunchiest pizza.
        </p>

        <p className="intro-text">
          The enthusiasm proved that Pizzeria’s Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
        </p>
      </section>

      {/* INGREDIENTS */}
      <section className="home-section">
        <div className="content-flex">
          <div className="image-block">
            <img
              src={ingredientsImg}
              alt="Ingredients"
              className="story-img"
            />
          </div>

          <div className="text-block">
            <h2>Ingredients</h2>
            <p>
              We’re ruthless about goodness. While they’re still young and fresh – that’s our motto.
              It makes the kitchen a better place.
            </p>
          </div>
        </div>
      </section>

      {/* OUR CHEFS */}
      <section className="home-section">
        <div className="content-flex reverse">
          <div className="image-block">
            <img
              src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
              alt="Chef"
              className="story-img"
            />
          </div>

          <div className="text-block">
            <h2>Our Chefs</h2>
            <p>
              They make sauces sing and salads dance. They create magic with skill,
              knowledge, passion and stirring spoons.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="home-section">
        <div className="content-flex">
          <div className="image-block">
            <img
              src={deliveryImg}
              alt="Delivery"
              className="story-img"
            />
          </div>

          <div className="text-block">
            <h2>45 min delivery</h2>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
