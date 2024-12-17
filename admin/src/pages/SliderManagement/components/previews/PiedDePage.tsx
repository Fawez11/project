import { PreviewProps } from "../../types";
import "./styles/PiedDePage.css";
const PiedDePage: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div className="preview-pied-de-page">
      <div className="content-grid">
        <div className="text-content">
          <span className="tag">{data.tag}</span>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <button className="action-button">Shop Now →</button>
        </div>
        <div className="image-content">
          <img src={data.photoUrl} alt={data.title} />
        </div>
      </div>
    </div>
  );
};

export default PiedDePage;
