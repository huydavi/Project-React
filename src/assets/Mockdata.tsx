import {
  FaClock,
  FaHeadset,
  FaMoneyBillWave,
  FaShippingFast,
  FaTags,
} from "react-icons/fa";
import Men from "../assets/Men.avif";
import Women from "../assets/Women.avif";
import Kid from "../assets/Kid.avif";

export const infoItems = [
  {
    icon: <FaShippingFast />,
    title: "Free Shipping",
    description: "Your order will be shipped for free",
  },
  {
    icon: <FaHeadset />,
    title: "Support 24/7",
    description: "We always support 24/7",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "100% Money Back",
    description: "100% refund if satisfied",
  },
  {
    icon: <FaClock />,
    title: "Payment Secure",
    description: "Your payment information is always safe",
  },
  {
    icon: <FaTags />,
    title: "Discount",
    description: "Wherever it is cheaper, we will refund",
  },
];

export const categories = [
  {
    title: "Men",
    imageURL: Men,
  },
  {
    title: "Women",
    imageURL: Women,
  },
  {
    title: "Kid",
    imageURL: Kid,
  },
];
