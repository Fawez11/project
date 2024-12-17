import { PreviewProps } from "../../types";
import "./styles/BanniereGauche.css";
const BanniereGauche: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-banniere-gauche">
      <div className="image-container">
        <img src={data.photoUrl} alt={data.title} />
      </div>
      <div className="content">
        <div className="header">
          <span className="tag">INTRODUCING</span>
          <h2>{data.title}</h2>
        </div>
        <p>{data.description}</p>
        <button className="cta-button">Shop Now →</button>
      </div>
    </div>
  );
};

export default BanniereGauche;
