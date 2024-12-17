import React from "react";

const ReviewsTab = () => {
  return (
    <>
      <div className="sherah-user-reviews">
        <ReviewItem
          name="Abubokkor Siddik"
          image="img/review-1.png"
          text="This is some unreal beauty! I really liked it! What a beautiful light it comes from! The radius of bright light is about meters"
        />
        <ReviewItem
          name="Admin"
          image="img/review-2.png"
          text="Thank Your for opinion."
          isReply={true}
        />
        <ReviewItem
          name="Deniella Rhodes"
          image="img/review-3.png"
          text="Really liked it! What a beautiful light it comes from! The radius of bright."
        />
      </div>

      <div className="sherah-review-comment mg-top-30">
        <h3 className="sherah-review-comment__title">Add Your Review</h3>
        <ReviewForm />
      </div>
    </>
  );
};

interface ReviewItemProps {
  name: string;
  image: string;
  text: string;
  isReply?: boolean;
}

const ReviewItem = ({
  name,
  image,
  text,
  isReply = false,
}: ReviewItemProps) => {
  return (
    <div
      className={`sherah-user-reviews__single ${
        isReply ? "sherah-user-reviews__single--reply" : ""
      }`}
    >
      <div className="shera-user-reviews_thumb">
        <img src={image} alt={name} />
      </div>
      <div className="sherah-user-reviews__content">
        <h4 className="sherah-user-reviews_title">{name}</h4>
        <div className="sherah-product-card__rating sherah-dflex sherah-flex-gap-5">
          {[1, 2, 3, 4].map((star) => (
            <span key={star} className="sherah-color4">
              <i className="fa fa-star"></i>
            </span>
          ))}
        </div>
        <p className="sherah-user-reviews__text">{text}</p>
        <ReviewButtons />
      </div>
    </div>
  );
};

const ReviewButtons = () => {
  return (
    <div className="sherah-user-reviews__buttons">
      <a href="#" className="sherah-color3 sherah-color3__bg--opactity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.136"
          height="15.5"
          viewBox="0 0 17.136 15.5"
        >
          <path
            id="Icon"
            d="M106.729,13.669v.694a.779.779,0,0,0-.022.1,5.407,5.407,0,0,1-.909,2.507,10.756,10.756,0,0,1-1.877,2.153c-1.417,1.265-2.855,2.505-4.29,3.75a.9.9,0,0,1-1.28-.03q-1.646-1.415-3.287-2.836a17.082,17.082,0,0,1-2.561-2.63,5.638,5.638,0,0,1-1.136-2.513,4.777,4.777,0,0,1,1.049-4.005,4.03,4.03,0,0,1,3.775-1.423,3.938,3.938,0,0,1,2.419,1.328c.138.149.264.31.4.477.069-.089.128-.169.192-.246s.135-.162.208-.239A3.931,3.931,0,0,1,103.71,9.6a4.192,4.192,0,0,1,2.863,3.17C106.65,13.062,106.679,13.368,106.729,13.669Z"
            transform="translate(-90.443 -8.519)"
            fill="none"
            stroke="#09ad95"
            strokeWidth="1.7"
          />
        </svg>{" "}
        80
      </a>
      <a href="#" className="sherah-color2 sherah-color2__bg--opactity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.684"
          height="15.304"
          viewBox="0 0 17.684 15.304"
        >
          <path
            id="Icon"
            d="M122.755,24.156c-.059.315-.1.635-.18.945a7.044,7.044,0,0,1-1.362,2.647l-.383.482-1.064-.84.358-.454a5.942,5.942,0,0,0,1.108-2.061,4.449,4.449,0,0,0-.089-2.687,4.951,4.951,0,0,0-2.707-3.014,4.9,4.9,0,0,0-2.089-.447q-4.115-.007-8.231,0c-.032,0-.065,0-.094,0l3.064,3.06-.963.962-4.69-4.694,4.71-4.711.925.925-3.1,3.1h.24q4.005,0,8.01,0a6.442,6.442,0,0,1,3.671,1.067,6.311,6.311,0,0,1,2.422,3,5.989,5.989,0,0,1,.417,1.86.716.716,0,0,0,.025.114Z"
            transform="translate(-105.221 -13.137)"
            fill="#ff6767"
            stroke="#ff6767"
            strokeWidth="0.3"
          />
        </svg>{" "}
        Reply
      </a>
    </div>
  );
};

const ReviewForm = () => {
  return (
    <form
      className="sherah-wc__form-main sherah-form-main--v2 p-0"
      action="#"
      method="post"
    >
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">First Name *</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Your name here"
                type="text"
                name="f_name"
                required
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Email Address*</label>
            <div className="form-group__input">
              <input
                className="sherah-wc__form-input"
                placeholder="Your email address here"
                type="email"
                name="email"
                required
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="sherah-wc__form-label">Review*</label>
            <div className="form-group__input">
              <textarea
                className="sherah-wc__form-input sherah-wc__form-input--big"
                placeholder="Write your review"
                name="review"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group mg-top-30">
        <button type="submit" className="sherah-btn sherah-btn__primary">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewsTab;
