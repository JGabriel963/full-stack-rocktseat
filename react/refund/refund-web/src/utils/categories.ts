import foodSvg from "../assets/food.svg";
import othersSvg from "../assets/others.svg";
import serviceSvg from "../assets/services.svg";
import transportSvg from "../assets/transport.svg";
import accomodationSvg from "../assets/accommodation.svg";

export const CATEGORIES = {
  food: {
    name: "Alimentação",
    icon: foodSvg,
  },
  transport: {
    name: "Transporte",
    icon: transportSvg,
  },
  accommodation: {
    name: "Moradia",
    icon: accomodationSvg,
  },
  services: {
    name: "Serviços",
    icon: serviceSvg,
  },
  others: {
    name: "Outros",
    icon: othersSvg,
  },
};

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;
