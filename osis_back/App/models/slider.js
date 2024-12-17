import { DataTypes } from "sequelize";
import Sequelize from "../../config/database.js";
import { Op } from "sequelize";

const Slider = Sequelize.define(
  "Slider",
  {
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bannerType: {
      type: DataTypes.ENUM(
        "carouselPrincipal",
        "banniereEntete",
        "banniereSecondaire",
        "banniereCentrale",
        "banniereDroite",
        "banniereGauche",
        "banniereBas",
        "piedDePage"
      ),
      defaultValue: "carouselPrincipal",
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "slider",
    timestamps: true,
    hooks: {
      beforeCreate: async (slider) => {
        if (slider.isActive && slider.bannerType !== "carouselPrincipal") {
          await Slider.update(
            { isActive: false },
            {
              where: {
                bannerType: slider.bannerType,
                id: { [Op.ne]: slider.id },
              },
            }
          );
        }
      },
      beforeUpdate: async (slider) => {
        if (
          slider.changed("isActive") &&
          slider.isActive &&
          slider.bannerType !== "carouselPrincipal"
        ) {
          await Slider.update(
            { isActive: false },
            {
              where: {
                bannerType: slider.bannerType,
                id: { [Op.ne]: slider.id },
              },
            }
          );
        }
      },
      beforeDestroy: async (slider) => {
        if (slider.isActive && slider.bannerType !== "carouselPrincipal") {
          const nextSlider = await Slider.findOne({
            where: {
              bannerType: slider.bannerType,
              id: { [Op.ne]: slider.id },
            },
            order: [["createdAt", "DESC"]],
          });
          if (nextSlider) {
            await nextSlider.update({ isActive: true });
          }
        }
      },
    },
  }
);

export default Slider;
