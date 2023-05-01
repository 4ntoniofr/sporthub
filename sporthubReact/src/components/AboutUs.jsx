import "../assets/styles/aboutUs.css";

export default function AboutUs() {
  return (
    <div>
      <section className="sporthub-section">
        <h2 className="about-us-header">What is SportHub?</h2>

        <img
          className="about-img"
          alt="Image not found"
          src="https://user-images.githubusercontent.com/100539990/221368717-a32486ad-8628-4658-8354-b97b5eaa3a43.png"
          aria-label="Sporthub logo"
        />

        <p>
          At SportHub, we believe that everyone should have access to quality
          sports products at <b>affordable prices</b>. That's why we are
          committed to providing a <b> user-friendly platform </b> that makes it
          easy for our customers to find the products they need and make their
          purchases with ease.
        </p>

        <p>
          We are passionate about sports, and we want to share that passion with
          our customers by providing them with a platform that offers the{" "}
          <b>best sports products</b> in the market.
        </p>
      </section>

      <section className="sporthub-section">
        <h2 className="about-us-header">Mission</h2>

        <p>
          At SportHub, our mission is to provide a seamless and{" "}
          <b>enjoyable shopping experience</b> for our users. Our goal is to
          create a platform that is <b>accessible to everyone</b>, regardless of
          their technical background.
        </p>
        <p>
          In order to achieve this, we have focused on creating a{" "}
          <b>clean and intuitive user interface</b>. We believe that design
          plays a crucial role in user experience, and we have worked hard to
          ensure that SportHub looks and feels great. We have also made sure
          that our platform is optimized for speed and efficiency, so that our
          users can <b>shop without any delays </b> or interruptions.
        </p>
      </section>

      <div className="row align-items-start project-div">
        <section className="col project-section">
          <h2 className="about-us-header">Team</h2>
          <p>
            We are a group of five Software Engineering students who are
            currently in our third year of studies. We are taking the User
            Interfaces subject, and as part of the course requirements, we have
            decided to create an e-commerce platform called SportHub. Our goal
            is to create an accessible and functional online store for sports
            enthusiasts that offers a wide range of high-quality products.
          </p>
          <p>
            Our team consists of five highly motivated individuals who are all
            committed to making SportHub a success. Our team members are Jorge,
            Valentín, Antonio, Pepe, and Pablo. We all come from different
            backgrounds and have different skill sets, which allows us to work
            together effectively and bring a unique perspective to the table.
          </p>
        </section>

        <section className="col project-section">
          <h2 className="about-us-header">Technologies</h2>
          <p>
            We decided to use React and SQLite3 as our core technologies for
            this project. React, is utilized for constructing user interfaces.
            SQLite3, on the other hand, is a lightweight database management
            system that is best suited for modest-scale endeavors. This has
            resulted in the development of a platform that is both responsive
            and efficient.
          </p>
          <p>
            Together, we are committed to making SportHub the best possible
            platform for our users. We are excited to continue developing and
            improving our platform, and we hope that you will join us on this
            journey. If you are interested in examining our code or contributing
            to our project, we encourage you to visit our GitHub repository.
          </p>
          <a id="about-us-ghub" href="https://github.com/4ntoniofr/sporthub" aria-label="Github project">
            <ion-icon size="large" name="logo-github" />
          </a>
        </section>
      </div>

      {/* <section className="col project-section">
        <h4 className="about-us-header">
          <ion-icon className="arrow-newsletter" name="chevron-down-outline" />{" "}
          Suscribe to our newsletter!{" "}
          <ion-icon className="arrow-newsletter" name="chevron-down-outline" />
        </h4>

        <button className="mail-button">
          <ion-icon id="mail-icon" name="mail-outline" />
        </button>
      </section> */}
    </div>
  );
}
