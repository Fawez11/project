const UpdatePartnerModal = ({
  setLogoSlotStyle,
  logoSlotStyle,
  displayedLogo,
  handleUpdateLogoChange,
  selectedPartner,
  setUpdatedName,
  closeUpdateModal,
  handleUpdate,
  updatedLogo,
  partnersNames,
  updatedName,
}: {
  setLogoSlotStyle: any;
  logoSlotStyle: any;
  displayedLogo: any;
  handleUpdateLogoChange: any;
  selectedPartner: any;
  setUpdatedName: any;
  closeUpdateModal: any;
  handleUpdate: any;
  updatedLogo: any;
  partnersNames: any;
  updatedName: any;
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
        onClick={closeUpdateModal}
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
          <h2>Update Partner</h2>
          <p>ID: {selectedPartner?.id}</p>
          <p>Non: {selectedPartner?.name}</p>

          <div style={{ marginBottom: "1%" }}>
            <p>Current Logo:</p>
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
              <img
                src={displayedLogo || ""}
                alt="Partner Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 1000,
                }}
              />
            </div>
            <input
              id="iconInput"
              type="file"
              accept="image/*"
              onChange={handleUpdateLogoChange}
              style={{ display: "none" }}
            />
          </div>

          <input
            type="text"
            placeholder={selectedPartner?.name}
            onChange={(e) => setUpdatedName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
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
                color: partnersNames.includes(updatedName.toLowerCase())
                  ? "red"
                  : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`${updatedName} existe déjà`}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeUpdateModal}
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
                    (!partnersNames.includes(updatedName.toLowerCase()) &&
                      updatedName) ||
                    updatedLogo
                      ? "#007bff"
                      : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: partnersNames.includes(updatedName)
                    ? "not-allowed"
                    : "pointer",
                }}
                onClick={() => handleUpdate()}
                disabled={
                  (!updatedName && !updatedLogo) ||
                  (!!updatedName &&
                    partnersNames.includes(updatedName.toLowerCase()))
                }
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePartnerModal;
