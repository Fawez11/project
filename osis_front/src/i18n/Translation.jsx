import "./i18n";
import React from "react";
import { useTranslation } from "react-i18next";

export const Translation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("fr")}>Français</button>
        <button onClick={() => changeLanguage("ar")}>Arabic</button>
      </header>

      <h1>{t("welcome")}</h1>
      <p>{t("product_name")}: Example Product</p>
      <p>{t("price")}: $100</p>
      <button>{t("add_to_cart")}</button>
    </div>
  );
};
