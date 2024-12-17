const UpdateCategoryModal = ({
  setIconSlotStyle,
  iconSlotStyle,
  displayedIcon,
  handleUpdateIconChange,
  selectedCategory,
  setUpdatedTitle,
  closeUpdateModal,
  handleUpdate,
  updatedIcon,
  categoriesNames,
  updatedTitle,
}: {
  setIconSlotStyle: any;
  iconSlotStyle: any;
  displayedIcon: any;
  handleUpdateIconChange: any;
  selectedCategory: any;
  setUpdatedTitle: any;
  closeUpdateModal: any;
  handleUpdate: any;
  updatedIcon: any;
  categoriesNames: any;
  updatedTitle: any;
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
          <h2>Update Category</h2>
          <p>ID: {selectedCategory?.id}</p>
          <p>Title: {selectedCategory?.title}</p>

          <div style={{ marginBottom: "1%" }}>
            <p>Current Icon:</p>
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
              <img
                src={displayedIcon || ""}
                alt="Category Icon"
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
              onChange={handleUpdateIconChange}
              style={{ display: "none" }}
            />
          </div>

          <input
            type="text"
            placeholder={selectedCategory?.title}
            onChange={(e) => setUpdatedTitle(e.target.value)}
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
                color: categoriesNames.includes(updatedTitle.toLowerCase())
                  ? "red"
                  : "rgb(0, 0, 0, 0)",
                fontWeight: "initial",
              }}
            >
              {`${updatedTitle} existe déjà`}
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
                    (!categoriesNames.includes(updatedTitle.toLowerCase()) &&
                      updatedTitle) ||
                    updatedIcon
                      ? "#007bff"
                      : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: categoriesNames.includes(updatedTitle)
                    ? "not-allowed"
                    : "pointer",
                }}
                onClick={() => handleUpdate()}
                disabled={
                  (!updatedTitle && !updatedIcon) ||
                  (!!updatedTitle &&
                    categoriesNames.includes(updatedTitle.toLowerCase()))
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

export default UpdateCategoryModal;
