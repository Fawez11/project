const CreatePartnerModal = ({
  setLogoSlotStyle,
  logoSlotStyle,
  handleCreateLogoChange,
  selectedPartner,
  setNewPartner,
  closeCreateModal,
  newPartner,
  partnersNames,
  handleCreate,
}: {
  setLogoSlotStyle: any;
  logoSlotStyle: any;
  handleCreateLogoChange: any;
  selectedPartner: any;
  setNewPartner: any;
  closeCreateModal: any;
  newPartner: any;
  partnersNames: any;
  handleCreate: any;
}) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          pointerEvents: "auto",
        }}
        onClick={closeCreateModal}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "500px",
            width: "100%",
            zIndex: 1001,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click propagation
        >
          <h2>Créer un nouveau partenaire</h2>

          <div style={{ marginBottom: "1%" }}>
            <p>selectionner un logo</p>
            <div
              onMouseEnter={() => {
                setLogoSlotStyle({
                  ...logoSlotStyle,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                });
              }}
              onMouseLeave={() => {
                setLogoSlotStyle({
                  ...logoSlotStyle,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                });
              }}
              style={logoSlotStyle}
              onClick={() => document.getElementById("iconInput")?.click()}
            >
              {newPartner.logo ? (
                <img
                  src={URL.createObjectURL(newPartner.logo)}
                  alt="Partner Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1000,
                  }}
                />
              ) : (
                <h1 style={{ textAlign: "center" }}>+</h1>
              )}
            </div>
            <input
              id="iconInput"
              type="file"
              accept="image/*"
              onChange={handleCreateLogoChange}
              style={{ display: "none" }}
            />
          </div>
          <p>ajouter le nom du partenaire:</p>
          <input
            type="text"
            placeholder={selectedPartner?.name}
            onChange={(e) =>
              setNewPartner((prev: any) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <h6
              style={{
                color: partnersNames.includes(newPartner.name.toLowerCase())
                  ? "red"
                  : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`${newPartner.name} existe déjà`}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeCreateModal}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "cyan",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    partnersNames.includes(newPartner.name.toLowerCase()) ||
                    !newPartner.name ||
                    !newPartner.logo
                      ? "#ccc"
                      : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    partnersNames.includes(newPartner.name.toLowerCase()) ||
                    !newPartner.name ||
                    !newPartner.logo
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() => handleCreate()}
                disabled={
                  partnersNames.includes(newPartner.name.toLowerCase()) ||
                  !newPartner.name ||
                  !newPartner.logo
                }
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePartnerModal;
