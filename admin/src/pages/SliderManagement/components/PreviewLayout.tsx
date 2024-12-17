import { BannerType, Slider } from "../types";
import CarouselPrincipal from "./previews/CarouselPrincipal";
import BanniereEntete from "./previews/BanniereEntete";

import BanniereCentrale from "./previews/BanniereCentrale";
import BanniereDroite from "./previews/BanniereDroite";
import BanniereGauche from "./previews/BanniereGauche";
import BanniereBas from "./previews/BanniereBas";
import PiedDePage from "./previews/PiedDePage";

interface PreviewLayoutProps {
  type: BannerType;
  data: Slider;
}

const PreviewLayout: React.FC<PreviewLayoutProps> = ({ type, data }) => {
  const components = {
    carouselPrincipal: CarouselPrincipal,
    banniereEntete: BanniereEntete,

    banniereCentrale: BanniereCentrale,
    banniereDroite: BanniereDroite,
    banniereGauche: BanniereGauche,
    banniereBas: BanniereBas,
    piedDePage: PiedDePage,
  };

  const Component = components[type];
  return Component ? <Component data={data} /> : null;
};

export default PreviewLayout;
