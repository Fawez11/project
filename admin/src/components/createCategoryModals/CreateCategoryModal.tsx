const CreateCategoryModal = ({
  setIconSlotStyle,
  iconSlotStyle,
  handleCreateIconChange,
  selectedCategory,
  setNewCategory,
  closeCreateModal,
  newCategory,
  categoriesNames,
  handleCreate,
}: {
  setIconSlotStyle: any;
  iconSlotStyle: any;
  handleCreateIconChange: any;
  selectedCategory: any;
  setNewCategory: any;
  closeCreateModal: any;
  newCategory: any;
  categoriesNames: any;
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
          <h2>Créer une nouvelle catégorie</h2>

          <div style={{ marginBottom: "1%" }}>
            <p>selectionner une icône</p>
            <div
              onMouseEnter={() => {
                setIconSlotStyle({
                  ...iconSlotStyle,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                });
              }}
              onMouseLeave={() => {
                setIconSlotStyle({
                  ...iconSlotStyle,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                });
              }}
              style={iconSlotStyle}
              onClick={() => document.getElementById("iconInput")?.click()}
            >
              {newCategory.icon ? (
                <img
                  src={URL.createObjectURL(newCategory.icon)}
                  alt="Category Icon"
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
              onChange={handleCreateIconChange}
              style={{ display: "none" }}
            />
          </div>
          <p>ajouter le titre de la catégorie:</p>
          <input
            type="text"
            placeholder={selectedCategory?.title}
            onChange={(e) =>
              setNewCategory((prev: any) => ({
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
                color: categoriesNames.includes(newCategory.title.toLowerCase())
                  ? "red"
                  : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`${newCategory.title} existe déjà`}
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
                    categoriesNames.includes(newCategory.title.toLowerCase()) ||
                    !newCategory.title ||
                    !newCategory.icon
                      ? "#ccc"
                      : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    categoriesNames.includes(newCategory.title.toLowerCase()) ||
                    !newCategory.title ||
                    !newCategory.icon
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() => handleCreate()}
                disabled={
                  categoriesNames.includes(newCategory.title.toLowerCase()) ||
                  !newCategory.title ||
                  !newCategory.icon
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

export default CreateCategoryModal;
