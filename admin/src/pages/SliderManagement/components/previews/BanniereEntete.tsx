import { PreviewProps } from "../../types";
import "./styles/BanniereEntete.css";

const BanniereEntete: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-banniere-entete">
      <span className="tag">{data.tag}</span>
      <div className="content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <button className="shop-now">Shop Now →</button>
      </div>
      <div className="image-container">
        <img src={data.photoUrl} alt={data.title} />
      </div>
    </div>
  );
};

export default BanniereEntete;
