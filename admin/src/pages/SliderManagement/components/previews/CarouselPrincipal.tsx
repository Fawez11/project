import { PreviewProps } from "../../types";
import "./styles/CarouselPrincipal.css";

const CarouselPrincipal: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-carousel-principal">
      <span className="tag">{data.tag}</span>
      <div className="carousel-content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <button className="shop-now">
          Shop Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
      <div className="carousel-image">
        <img src={data.photoUrl} alt={data.title} />
      </div>
    </div>
  );
};

export default CarouselPrincipal;
