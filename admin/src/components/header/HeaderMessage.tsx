import React from "react";
import MessageSvg from "../svgComponenents/MessageSvg";

function HeaderMessage() {
  return (
    <div className="sherah-header__dropmenu sherah-header__dropmenu--messages">
      <MessageSvg />
      <span className="sherah-header__message--animate sherah-color3__bg--light">
        <span className="sherah-color3__bg"></span>
      </span>
      <div className="sherah-dropdown-card sherah-dropdown-card__alarm sherah-border">
        <svg
          className="sherah-dropdown-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="43.488"
          height="22.207"
          viewBox="0 0 43.488 22.207"
        >
          <path
            id="Path_1271"
            data-name="Path 1271"
            d="M-15383,7197.438l20.555-20.992,20.555,20.992Z"
            transform="translate(15384.189 -7175.73)"
            strokeWidth="1"
          />
        </svg>
        <h3 className="sherah-dropdown-card__title sherah-border-btm">
          Recent Message
        </h3>
        <ul className="sherah-dropdown-card_list sherah-chatbox__list sherah-chatbox__list__header">
          {/* <!-- Single List --> */}
          <li>
            <div className="sherah-chatbox__inner">
              <div className="sherah-chatbox__author">
                <div className="sherah-chatbox__author-img">
                  <img src="img/chat-author1.png" alt="#" />
                  <span className="sherah-chatbox__author-online"></span>
                </div>
                <div className="sherah-chatbox__author-content">
                  <h4 className="sherah-chatbox__author-title">Jamen Oliver</h4>
                  <p className="sherah-chatbox__author-desc">
                    Hey! You forgot your keys....
                  </p>
                </div>
              </div>
            </div>
          </li>
          {/* <!-- End Single List -->
                                          <!-- Single List --> */}
          <li>
            <div className="sherah-chatbox__inner">
              <div className="sherah-chatbox__author">
                <div className="sherah-chatbox__author-img">
                  <img src="img/chat-author2.png" alt="#" />
                  <span className="sherah-chatbox__author-online author-not-online"></span>
                </div>
                <div className="sherah-chatbox__author-content">
                  <h4 className="sherah-chatbox__author-title">Orian Heho</h4>
                  <p className="sherah-chatbox__author-desc">How are you?</p>
                </div>
              </div>
              <div className="sherah-chatbox__right">
                <span className="sherah-chatbox__unread sherah-color1__bg">
                  5
                </span>
              </div>
            </div>
          </li>
          {/*	<!-- End Single List -->
                                          <!-- Single List --> */}
          <li>
            <div className="sherah-chatbox__inner">
              <div className="sherah-chatbox__author">
                <div className="sherah-chatbox__author-img">
                  <img src="img/chat-author3.png" alt="#" />
                  <span className="sherah-chatbox__author-online author-not-online"></span>
                </div>
                <div className="sherah-chatbox__author-content">
                  <h4 className="sherah-chatbox__author-title">Brotherhood</h4>
                </div>
              </div>
            </div>
          </li>
          {/* <!-- End Single List -->
                                          <!-- Single List --> */}
          <li>
            <div className="sherah-chatbox__inner">
              <div className="sherah-chatbox__author">
                <div className="sherah-chatbox__author-img">
                  <img src="img/chat-author4.png" alt="#" />
                  <span className="sherah-chatbox__author-online"></span>
                </div>
                <div className="sherah-chatbox__author-content">
                  <h4 className="sherah-chatbox__author-title">Rose Rovert</h4>
                  <p className="sherah-chatbox__author-desc">
                    Of course I work the finaly done ....
                  </p>
                </div>
              </div>
            </div>
          </li>
          {/* <!-- End Single List -->
                                          <!-- Single List --> */}
          <li>
            <div className="sherah-chatbox__inner">
              <div className="sherah-chatbox__author">
                <div className="sherah-chatbox__author-img">
                  <img src="img/chat-author5.png" alt="#" />
                  <span className="sherah-chatbox__author-online author-is-busy"></span>
                </div>
                <div className="sherah-chatbox__author-content">
                  <h4 className="sherah-chatbox__author-title">Mahstai</h4>
                  <p className="sherah-chatbox__author-desc">
                    Any plan for today?
                  </p>
                </div>
              </div>
              <div className="sherah-chatbox__right">
                <span className="sherah-chatbox__unread sherah-color1__bg">
                  7
                </span>
              </div>
            </div>
          </li>
          {/* <!-- End Single List --> */}
        </ul>
        {/* <!-- sherah Balance Button --> */}
        <div className="sherah-dropdown-card__button">
          <a
            href="chat-messages.html"
            className="sherah-dropdown-card__sell-all"
          >
            See all Notification
          </a>
        </div>
      </div>
      {/* <!-- End sherah Balance Hover --> */}
    </div>
  );
}

export default HeaderMessage;
