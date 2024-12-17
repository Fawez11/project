import { FaEdit, FaTrash, FaPowerOff } from "react-icons/fa";
import { Slider } from "../types";

type SliderListProps = {
  sliders: Slider[];
  selectedBannerType: string;
  selectedSlider: Slider | null;
  onSliderSelect: (slider: Slider) => void;
  onSliderAction: (sliderId: string, action: "delete" | "activate") => void;
  isLoading?: boolean;
};

const SliderList: React.FC<SliderListProps> = ({
  sliders,
  selectedSlider,
  onSliderSelect,
  onSliderAction,
  isLoading = false,
}) => (
  <div className="card shadow-sm" style={{ height: "calc(100vh - 200px)" }}>
    <div className="card-header bg-white d-flex justify-content-between align-items-center">
      <h3 className="card-title mb-0">Liste des bannières</h3>
      <span className="badge bg-primary">{sliders.length}</span>
    </div>
    <div className="card-body p-0" style={{ overflowY: "auto" }}>
      {isLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {sliders.map((slider) => (
            <div
              key={slider.id}
              className={`list-group-item list-group-item-action ${
                selectedSlider?.id === slider.id ? "active" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => onSliderSelect(slider)}
                >
                  <img
                    src={slider.photoUrl}
                    alt={slider.title}
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="flex-grow-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onSliderSelect(slider)}
                >
                  <h6 className="mb-1">{slider.title}</h6>
                  <small
                    className={`${
                      selectedSlider?.id === slider.id
                        ? "text-light"
                        : "text-muted"
                    }`}
                  >
                    {slider.description.substring(0, 50)}...
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onSliderSelect(slider)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`btn btn-sm ${
                      slider.isActive
                        ? "btn-outline-success"
                        : "btn-outline-warning"
                    }`}
                    onClick={() => onSliderAction(slider.id, "activate")}
                  >
                    <FaPowerOff />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onSliderAction(slider.id, "delete")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {sliders.length === 0 && (
            <div className="text-center py-4 text-muted">
              Aucune bannière disponible
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

export default SliderList;
