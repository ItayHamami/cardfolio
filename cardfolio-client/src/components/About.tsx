import { url } from "inspector";
import { FunctionComponent } from "react";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return ( 
<>
  <div className="container page-container mt-4" id="about">
    <section className="row">
      <div className="col-md-7">
        <h1>Welcome to CardFolio</h1>
        <p>Where innovation meets networking process</p>
     
      </div>
      <div id="logodiv" className="col-md-5 d-none d-lg-block">
        <img id="weblogo" src="/img/logo_transparent.png" alt="website logo" />
      </div>
      <hr />
    </section>

    <section className="mission">
      <div className="container">
        <div className="row">
        <div className="col-md-6">
        <h2>Our Mission</h2>
        <p>
          At CardFolio, we are on a mission to revolutionize the way
          professionals connect and showcase their identity in the digital
          realm. <br/> Our platform offers a seamless and modern solution for
          individuals and businesses to create, manage, and share their
          professional profiles.
        </p>
        </div>
        <div className="col-md-6">            
        <img
            src="/img/aboutcolab.jpg"
            alt="collabortaion photo"
            className="feature-image"
            />
            </div>
        </div>

      </div>
    </section>
    <hr />

    <section className="user-stories">
    <div className="container">
        <div className="row">
        <div className="col-md-6">
            <h2>Elevating Your Brand</h2>
            <p>
            Discover how entrepreneurs and executives are utilizing CardFolio's
            sleek and modern digital business cards to make a memorable first
            impression in a competitive online landscape.
            </p>
        </div>
        <div className="col-md-6">

        </div>
        </div>
    </div>
    </section>

    <section className="join-us">
      <div className="container">
        <div className="row">
        <div className="col-md-6">
            <img
              src="/img/ian-schneider-TamMbr4okv4-unsplash.jpg"
              alt="Join Us Today"
              className="feature-image"
            />
          </div>
          <div className="col-md-6">
            <h2>Join Us Today</h2>
            <p>
              Unlock your professional potential with CardFolio and redefine how
              you network. Whether you're attending conferences, meetings, or
              simply connecting with peers, our digital business cards provide
              you with a modern and effective tool to leave a lasting impression.
            </p>
            <a href="/" className="cta-button">
            Take a look at our cards:
            </a>
          </div>

        </div>
      </div>
    </section>
<hr />
    <section className="how-to-use my-3">

  <div className="usage-item">
    <h3>Create Your Digital Business Card</h3>
    <p>Sign up and personalize your card. Add contact info, profile picture, and a brief introduction to showcase your identity.</p>
  </div>

  <div className="usage-item">
    <h3>Explore and Connect</h3>
    <p>Browse digital business cards from professionals. Save favorites for easy access and stay connected in the digital networking community.</p>
  </div>

  <div className="usage-item">
    <h3>Business Users: Add and Edit Listings</h3>
    <p>Create and manage multiple listings. Showcase products, services, and company details to attract clients and partners.</p>
  </div>

  <div className="usage-item">
    <h3>Edit and Update Your Profile</h3>
    <p>Keep your card up to date. Edit contact info, update picture, or enhance your introduction with latest achievements.</p>
  </div>

  <div className="usage-item">
    <h3>Access Your Favorites</h3>
    <p>Store saved cards in one place. Easily reach out to professionals you've connected with or want to collaborate with.</p>
  </div>

  <p>Join CardFolio and revolutionize networking. Unlock endless possibilities for showcasing your professional potential.</p>
</section>

  </div>
  <div className="py-4"></div>
</>
    );
}
 
export default About;