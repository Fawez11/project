const CreateSubCategoryModal = ({
  categoryId,
  setNewSubCategory,
  closeCreateModal,
  newSubCategory,
  subCategoriesNames,
  handleCreate,
}: any) => {
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
          <h2>Créer une nouvelle sous catégorie</h2>
          <p>ajouter le titre:</p>
          <input
            type="text"
            placeholder="Sous catégorie"
            onChange={(e) =>
              setNewSubCategory((prev: any) => ({
                ...prev,
                title: e.target.value,
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
                color: subCategoriesNames.includes(
                  newSubCategory.title.toLowerCase()
                )
                  ? "red"
                  : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`${newSubCategory.title} existe déjà`}
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
                    subCategoriesNames.includes(
                      newSubCategory.title.toLowerCase()
                    ) || !newSubCategory.title
                      ? "#ccc"
                      : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    subCategoriesNames.includes(
                      newSubCategory.title.toLowerCase()
                    ) || !newSubCategory.title
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() => handleCreate(categoryId)}
                disabled={
                  subCategoriesNames.includes(
                    newSubCategory.title.toLowerCase()
                  ) || !newSubCategory.title
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

export default CreateSubCategoryModal;
