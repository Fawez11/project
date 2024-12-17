import React, { useState } from "react";
import { FaBell, FaEnvelope, FaMobile, FaTag, FaBox } from "react-icons/fa";
import "./NotificationsSettings.css";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      productUpdates: false,
    },
    mobile: {
      orderUpdates: true,
      promotions: false,
      newsletter: false,
      productUpdates: true,
    },
  });

  const handleToggle = (channel, setting) => {
    setSettings({
      ...settings,
      [channel]: {
        ...settings[channel],
        [setting]: !settings[channel][setting],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification settings saved:", settings);
    // Add your save logic here
  };

  return (
    <div className="notification-settings">
      <div className="notification-settings-container">
        <h1>
          <FaBell /> Notification Settings
        </h1>
        <p className="description">
          Manage how you receive notifications and updates from us.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Notifications */}
          <div className="notification-section">
            <h2>
              <FaEnvelope /> Email Notifications
            </h2>
            <div className="notification-options">
              <div className="notification-option">
                <div className="option-info">
                  <div className="option-icon">
                    <FaBox />
                  </div>
                  <div className="option-text">
                    <h3>Order Updates</h3>
                    <p>Receive updates about your orders via email</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.email.orderUpdates}
                    onChange={() => handleToggle("email", "orderUpdates")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div className="option-info">
                  <div className="option-icon">
                    <FaTag />
                  </div>
                  <div className="option-text">
                    <h3>Promotions</h3>
                    <p>Receive special offers and promotions</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.email.promotions}
                    onChange={() => handleToggle("email", "promotions")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div className="option-info">
                  <div className="option-icon">
                    <FaEnvelope />
                  </div>
                  <div className="option-text">
                    <h3>Newsletter</h3>
                    <p>Receive our weekly newsletter</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.email.newsletter}
                    onChange={() => handleToggle("email", "newsletter")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Notifications */}
          <div className="notification-section">
            <h2>
              <FaMobile /> Mobile Notifications
            </h2>
            <div className="notification-options">
              <div className="notification-option">
                <div className="option-info">
                  <div className="option-icon">
                    <FaBox />
                  </div>
                  <div className="option-text">
                    <h3>Order Updates</h3>
                    <p>Receive updates about your orders via SMS</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.mobile.orderUpdates}
                    onChange={() => handleToggle("mobile", "orderUpdates")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div className="option-info">
                  <div className="option-icon">
                    <FaTag />
                  </div>
                  <div className="option-text">
                    <h3>Promotions</h3>
                    <p>Receive special offers and promotions via SMS</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.mobile.promotions}
                    onChange={() => handleToggle("mobile", "promotions")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">
              Save Preferences
            </button>
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettings;
