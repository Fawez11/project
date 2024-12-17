export type BannerType =
  | "carouselPrincipal"
  | "banniereEntete"
  | "banniereBas"
  | "banniereDroite"
  | "banniereGauche"
  | "banniereCentrale"
  | "piedDePage";

export const BANNER_TYPES: Record<BannerType, string> = {
  carouselPrincipal: "Carousel Principal",
  banniereEntete: "Bannière Entête",
  banniereCentrale: "Bannière Centrale",
  banniereDroite: "Bannière Droite",
  banniereGauche: "Bannière Gauche",
  banniereBas: "Bannière Bas",
  piedDePage: "Pied de Page",
};

export interface Product {
  id: string;
  name: string;
  finalPrice: number;
  discountPercentage: number;
  isOnSale: boolean;
  // add other product fields if needed
}

export interface Slider {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  bannerType: BannerType;
  tag: string;
  isActive: boolean;
  productId?: string;
  product?: Product;
  price?: number;
}

export type TagType =
  | "nouveaute"
  | "promotion"
  | "populaire"
  | "recommande"
  | "special";
export interface PreviewProps {
  data: Slider;
}
