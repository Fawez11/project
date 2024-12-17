const UpdateSubCategoryModal = ({
  selectedSubCategory,
  setUpdatedTitle,
  updatedTitle,
  closeUpdateModal,
  handleUpdate,
}: any) => {
  return (
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
      }}
      onClick={closeUpdateModal}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Modifier Sous-catégorie</h2>
        <p>ID: {selectedSubCategory?.id}</p>
        <input
          type="text"
          value={updatedTitle || ""}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={closeUpdateModal}
            style={{ marginRight: "10px", padding: "6px 12px" }}
          >
            Annuler
          </button>
          <button onClick={handleUpdate} style={{ padding: "6px 12px" }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategoryModal;
