import { PreviewProps } from "../../types";
import "./styles/BanniereCentrale.css";
const BanniereCentrale: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-banniere-centrale">
      <div className="content">
        <div className="text-content">
          <span className="tag">{data.tag}</span>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
        <div className="image-container">
          <img src={data.photoUrl} alt={data.title} />
        </div>
        <button className="shop-now">Shop Now →</button>
      </div>
    </div>
  );
};

export default BanniereCentrale;
