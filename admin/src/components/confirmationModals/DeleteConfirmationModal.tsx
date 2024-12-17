const DeleteConfirmationModal = ({
  target,
  closeDeleteModal,
  handleDelete,
  password,
  setPassword,
  incorrectPasswordError,
}: {
  target: string;
  closeDeleteModal: any;
  handleDelete: any;
  password: string;
  setPassword: any;
  incorrectPasswordError: boolean;
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
        onClick={closeDeleteModal}
      >
        <div
          style={{
            height: "35%",
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2>
              Êtes-vous sûr de vouloir supprimer les {target} sélectionnés ?
            </h2>
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: "black", padding: "2%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h6
              style={{
                color: incorrectPasswordError ? "red" : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`Mot de passe incorrect`}
            </h6>
            <div>
              <button
                onClick={closeDeleteModal}
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
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
