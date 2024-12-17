// src/pages/SignUp.tsx
import welcomePng from "../assets/img/welcome-bg.png";
import welcomeVector from "../assets/img/welcome-vector.png";
import logo from "../assets/img/logo.png";
import accountBg from "../assets/img/account-bg.png";

const SignUp = () => {
  return (
    <section
      className="sherah-wc sherah-wc__full sherah-wc-singup sherah-bg-cover"
      style={{ backgroundImage: `url(${accountBg})` }}
    >
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-6 col-md-6 col-12 sherah-wc-col-one">
            <div
              className="sherah-wc__inner"
              style={{ backgroundImage: `url(${welcomePng})` }}
            >
              {/* Logo */}
              <div className="sherah-wc__logo">
                <a href="index.html">
                  <img src={logo} alt="#" />
                </a>
              </div>
              {/* Middle Image */}
              <div className="sherah-wc__middle">
                <a href="index.html">
                  <img src={welcomeVector} alt="#" />
                </a>
              </div>
              {/* Welcome Heading */}
              <h2 className="sherah-wc__title">
                Welcome to Sherah eCommerce <br /> Admin Panel
              </h2>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 sherah-wc-col-two">
            <div className="sherah-wc__form">
              <div className="sherah-wc__form-inner">
                <h3 className="sherah-wc__form-title sherah-wc__form-title__one">
                  Create Your Account{" "}
                  <span>Please enter your details to sign up</span>
                </h3>
                {/* Sign Up Form */}
                <form
                  className="sherah-wc__form-main p-0"
                  action="index.html"
                  method="post"
                >
                  <div className="form-group">
                    <label className="sherah-wc__form-label">
                      First Name *
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group">
                    <label className="sherah-wc__form-label">Last Name *</label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group">
                    <label className="sherah-wc__form-label">
                      Email Address
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        type="email"
                        name="email"
                        placeholder="demo3243@gmail.com"
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group">
                    <label className="sherah-wc__form-label">Password</label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        id="password-field"
                        type="password"
                        name="password"
                        maxLength={8}
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group">
                    <label className="sherah-wc__form-label">
                      Confirm Password
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        id="confirm-password-field"
                        type="password"
                        name="confirmPassword"
                        maxLength={8}
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group form-mg-top25">
                    <div className="sherah-wc__button sherah-wc__button--bottom">
                      <button className="ntfmax-wc__btn" type="submit">
                        Sign Up
                      </button>
                      <div className="sherah-wc__inside--group">
                        <button
                          className="ntfmax-wc__btn ntfmax-wc__btn-social"
                          type="submit"
                        >
                          <div className="ntfmax-wc__btn-icon">
                            <i className="fa-brands fa-google"></i>
                          </div>
                          Sign Up with Google
                        </button>
                        <button
                          className="ntfmax-wc__btn ntfmax-wc__btn-social"
                          type="submit"
                        >
                          <div className="ntfmax-wc__btn-icon">
                            <i className="fa-brands fa-twitter"></i>
                          </div>
                          Sign Up with Twitter
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Form Group */}
                  <div className="form-group mg-top-20">
                    <div className="sherah-wc__bottom">
                      <p className="sherah-wc__text">
                        Already have an account? <a href="login.html">Log in</a>
                      </p>
                    </div>
                  </div>
                </form>
                {/* End Sign Up Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
