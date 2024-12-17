import { BannerType } from "../types";

type SidebarProps = {
  selectedBannerType: BannerType;
  sliders: Array<{ bannerType: BannerType }>;
  onBannerTypeSelect: (type: BannerType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const bannerTypeLabels: Record<BannerType, string> = {
  carouselPrincipal: "Carousel Principal",
  banniereEntete: "Bannière Entête",
  banniereCentrale: "Bannière Centrale",
  banniereDroite: "Bannière Droite",
  banniereGauche: "Bannière Gauche",
  banniereBas: "Bannière Bas",
  piedDePage: "Pied de Page",
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedBannerType,
  sliders,
  onBannerTypeSelect,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {/* Toggle Button - Only visible on mobile/tablet */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          left: isOpen ? "280px" : "20px",
          top: "20px",
          zIndex: 1000,
          background: "#fff",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          //   "@media (minWidth: 769px)": {
          //     display: "none",
          //   },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" /> // X icon
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" /> // Menu icon
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className="bg-white border-end shadow-sm"
        style={{
          width: "280px",
          position: "fixed",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 999,
        }}
      >
        <div className="p-4 border-bottom">
          <h4 className="mb-0 fw-bold" style={{ fontSize: "1.4rem" }}>
            Gestion des bannières
          </h4>
        </div>
        <div
          className="list-group list-group-flush flex-grow-1"
          style={{ overflowY: "auto" }}
        >
          {Object.entries(bannerTypeLabels).map(([type, label]) => (
            <button
              key={type}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 ${
                selectedBannerType === type
                  ? "active bg-primary text-white"
                  : ""
              }`}
              onClick={() => {
                onBannerTypeSelect(type as BannerType);
                if (window.innerWidth <= 768) {
                  setIsOpen(false);
                }
              }}
              style={{
                padding: "1rem 1.25rem",
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "all 0.2s ease",
                borderRadius: 0,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (selectedBannerType !== type) {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedBannerType !== type) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>{label}</span>
              <span
                className={`badge rounded-pill ${
                  selectedBannerType === type
                    ? "bg-white text-primary"
                    : "bg-primary"
                }`}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.35em 0.85em",
                }}
              >
                {sliders.filter((s) => s.bannerType === type).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && window.innerWidth <= 768 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
