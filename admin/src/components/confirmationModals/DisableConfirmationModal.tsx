const DisableConfirmationModal = ({
  target,
  closeDisableModal,
  handleDisable,
}: {
  target: string;
  closeDisableModal: any;
  handleDisable: any;
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
        onClick={closeDisableModal}
      >
        <div
          style={{
            height: "25%",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click propagation
        >
          <h2>
            Êtes-vous sûr de vouloir désactiver les {target} sélectionnés ?
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={closeDisableModal}
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
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleDisable()}
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisableConfirmationModal;
