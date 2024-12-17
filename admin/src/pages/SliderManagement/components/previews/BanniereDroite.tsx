import { PreviewProps } from "../../types";
import "./styles/BanniereDroite.css";
const BanniereDroite: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-banniere-droite">
      <div className="content">
        <div className="header">
          <span className="tag">{data.tag}</span>
          <h2>{data.title}</h2>
        </div>
        <p>{data.description}</p>
        <button className="cta-button">Shop Now →</button>
      </div>
      <div className="image-container">
        <img src={data.photoUrl} alt={data.title} />
      </div>
    </div>
  );
};

export default BanniereDroite;
