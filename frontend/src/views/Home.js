import Hero from "../components/Hero";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <Hero />

      <section className="home-info">
        <div>
          <h1>
            <span className="font-alt h1-title">YummyMoney</span> is here to
            help!
          </h1>
          <p>
            Here at YummyMoney, we want to provide people with a healthier diet,
            while also saving money. We provide users with many recipes which
            are simple, delicious and cost effective.
          </p>
          <p>
            Join us on our journey in saving our precious money, while also
            benefiting from a healthier lifestyle. What's to lose?
          </p>
          <p>Login or register below to get started.</p>
          <Link to="/register" className="btn-action" aria-current="page">
            Register
          </Link>
          <Link to="/login" className="btn-action" aria-current="page">
            Login
          </Link>
        </div>
      </section>

      <section className="section-quote">
        <div className="center-text">
          <blockquote className="quote font-alt">
            "Paths to better health are not always paved with money"
          </blockquote>
        </div>
      </section>

      <section className="section-research">
        <div>
          <h2>Research</h2>
          <div className="research-hr"></div>
          <h4>Health & Wealth</h4>
          <p>
            Many studies have shown the benefits from cooking and eating at
            home. The amazing part is that it can not only be a money saver, but
            can also have a positive influence on one's diet. A 2017 study by
            Arpita Tiwari found that home-cooked dinners produced better dietary
            guidline compliance without showing significant increase in
            expenditure.
          </p>
          <p>
            Another 2017 study coming from the Oregon State University,
            displayed how the paths to better health are not always paved with
            money. The research found that cooking at home can provide the most
            cost effective way nutritionally and financially.
          </p>
          <p>
            Statistically there has been a rise in meal delivery in Ireland. The
            irish meal delivery market is projected to experience a compound
            annual growth rate of 4.17% from 2024 to 2029. Ireland's meal
            delivery market is experiencing a surge in demand as consumers seek
            convenient options amidst their busy lifestyles. This is why we want
            to provide people with simple and cost effecient recipes to use at
            home.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
