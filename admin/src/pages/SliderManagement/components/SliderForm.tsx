import { ChangeEvent, FormEvent } from "react";
import { Slider, BannerType, TagType, Product } from "../types";
import ProductSearch from "./ProductSearch";
import { BANNER_TYPES } from "../types";

type SliderFormProps = {
  previewData: Omit<Slider, "id">;
  selectedSlider: Slider | null;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  selectedProductId?: string;
  onProductSelect: (product: Product | null) => void;
  selectedProduct: Product | null;
};

const SliderForm: React.FC<SliderFormProps> = ({
  previewData,
  selectedSlider,
  onInputChange,
  onImageChange,
  onSubmit,
  onCancel,
  isLoading = false,
  onProductSelect,
  selectedProduct,
}) => (
  <form onSubmit={onSubmit}>
    {/* Content Group */}
    <div className="card mb-4">
      <div className="mb-4">
        <h3 className="mb-3">
          {selectedSlider ? "Modifier la bannière" : "Nouvelle bannière"}
        </h3>
      </div>
      <div className="card-header bg-light">
        <h5 className="mb-0">Contenu de la bannière</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Titre
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={previewData.title}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={previewData.description}
                onChange={onInputChange}
                rows={3}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Product and Image Group */}
    <div className="card mb-4">
      <div className="card-header bg-light">
        <h5 className="mb-0">Produit et Image</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <ProductSearch
                onProductSelect={onProductSelect}
                initialProduct={selectedProduct}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={onImageChange}
                accept="image/*"
                required={!selectedSlider}
              />
              {previewData.photoUrl && (
                <img
                  src={previewData.photoUrl}
                  alt="Preview"
                  className="mt-2 img-thumbnail"
                  style={{ maxHeight: "200px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Settings Group */}
    <div className="card mb-4">
      <div className="card-header bg-light">
        <h5 className="mb-0">Paramètres</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="bannerType" className="form-label">
              Type de bannière
            </label>
            <select
              className="form-select"
              id="bannerType"
              name="bannerType"
              value={previewData.bannerType}
              onChange={onInputChange}
              required
            >
              {Object.entries(BANNER_TYPES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={previewData.tag}
              onChange={onInputChange}
              placeholder="Entrez un tag..."
              required
            />
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={previewData.isActive}
            onChange={onInputChange}
          />
          <label className="form-check-label" htmlFor="isActive">
            Activer la bannière
          </label>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="d-flex gap-2">
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Enregistrement...
          </>
        ) : selectedSlider ? (
          "Mettre à jour"
        ) : (
          "Créer"
        )}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onCancel}
        disabled={isLoading}
      >
        Annuler
      </button>
    </div>
  </form>
);

export default SliderForm;
