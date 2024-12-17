import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Slider, BannerType, Product } from "./types";
import { useToast } from "../../services/ToastContext";
import Sidebar from "./components/Sidebar";
import SliderForm from "./components/SliderForm";
import SliderList from "./components/SlideList";
import PreviewLayout from "./components/PreviewLayout";

const INITIAL_PREVIEW_CONTENT: Omit<Slider, "id"> = {
  title: "Titre de bannière",
  description: "Ajoutez une description attrayante pour votre bannière.",
  photoUrl: "https://placehold.co/600x400/e9ecef/495057?text=Votre+Image",
  bannerType: "carouselPrincipal",
  tag: "nouveauté",
  isActive: false,
  productId: undefined,
  product: {
    id: "preview",
    name: "Nom du produit",
    finalPrice: 299.99,
    isOnSale: true,
    discountPercentage: 20,
  },
};

const SliderManagement: React.FC = () => {
  const { showToast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [selectedBannerType, setSelectedBannerType] =
    useState<BannerType>("carouselPrincipal");
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);
  const [previewData, setPreviewData] = useState<Omit<Slider, "id">>({
    ...INITIAL_PREVIEW_CONTENT,
    bannerType: selectedBannerType,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [currentView, setCurrentView] = useState<"form" | "preview">("form");

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSliders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/slider/getAll`);
      setSliders(response.data);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message ||
          "Erreur lors du chargement des bannières",
        "error"
      );
      console.error("Error fetching sliders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedSlider(null);
    setSelectedProduct(null);
    setPreviewData({
      ...INITIAL_PREVIEW_CONTENT,
      bannerType: selectedBannerType,
    });
  };

  const handleBannerTypeSelect = (type: BannerType) => {
    setSelectedBannerType(type);
    resetForm();
  };

  const handleSliderSelect = async (slider: Slider) => {
    setSelectedSlider(slider);
    setPreviewData({
      title: slider.title,
      description: slider.description,
      photoUrl: slider.photoUrl,
      bannerType: slider.bannerType,
      tag: slider.tag,
      isActive: slider.isActive,
      productId: slider.productId || "",
      product: slider.product || undefined,
      price: slider.price || 0,
    });
    setSelectedProduct(slider.product || null);
  };

  const handleSliderAction = async (
    sliderId: string,
    action: "delete" | "activate"
  ) => {
    try {
      setIsLoading(true);
      if (action === "delete") {
        await axios.delete(`${apiUrl}/slider/deleteOne/${sliderId}`);
        showToast("Bannière supprimée avec succès", "success");
      } else {
        await axios.patch(`${apiUrl}/slider/${sliderId}/activate`);
        showToast("Statut de la bannière modifié avec succès", "success");
      }
      fetchSliders();
      if (selectedSlider?.id === sliderId) {
        resetForm();
      }
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Une erreur est survenue",
        "error"
      );
      console.error("Error fetching sliders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const newValue = type === "checkbox" ? checked : value;
    setPreviewData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (selectedSlider) {
      setSelectedSlider((prev) => ({
        ...prev!,
        [name]: newValue,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("L'image ne doit pas dépasser 5MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotoUrl = reader.result as string;

        setPreviewData((prev) => ({
          ...prev,
          photoUrl: newPhotoUrl,
        }));

        if (selectedSlider) {
          setSelectedSlider((prev) => ({
            ...prev!,
            photoUrl: newPhotoUrl,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", previewData.title);
      formData.append("description", previewData.description);
      formData.append("bannerType", previewData.bannerType);
      formData.append("tag", previewData.tag);
      formData.append("isActive", String(previewData.isActive));
      formData.append("productId", previewData.productId || "");

      const imageInput =
        document.querySelector<HTMLInputElement>('input[type="file"]');
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      } else if (previewData.photoUrl.startsWith("data:")) {
        const response = await fetch(previewData.photoUrl);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");
      }

      if (selectedSlider) {
        await axios.patch(
          `${apiUrl}/slider/updateOne/${selectedSlider.id}`,
          formData
        );
        showToast("Bannière mise à jour avec succès", "success");
      } else {
        await axios.post(`${apiUrl}/slider/add`, formData);
        showToast("Nouvelle bannière créée avec succès", "success");
      }
      fetchSliders();
      resetForm();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Une erreur est survenue",
        "error"
      );
      console.error("Error fetching sliders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSelect = (product: Product | null) => {
    setSelectedProduct(product);

    setPreviewData((prev: any) => ({
      ...prev,
      productId: product?.id || "",
      product: product,
    }));

    if (selectedSlider) {
      setSelectedSlider((prev: any) => ({
        ...prev!,
        productId: product?.id || "",
        product: product,
      }));
    }
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar
        selectedBannerType={selectedBannerType}
        sliders={sliders}
        onBannerTypeSelect={handleBannerTypeSelect}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? "280px" : "0px",
          transition: "all 0.3s ease",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="container-fluid py-4"
          style={{
            transition: "all 0.3s ease",
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            paddingLeft: isSidebarOpen ? "inherit" : "0",
            paddingRight: isSidebarOpen ? "inherit" : "0",
          }}
        >
          <div
            className="d-flex gap-4"
            style={{
              width: "100%",
              padding: isSidebarOpen ? "inherit" : "0 15px",
            }}
          >
            <div style={{ flex: "2" }}>
              <div className="card shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      setCurrentView(
                        currentView === "form" ? "preview" : "form"
                      )
                    }
                  >
                    {currentView === "form"
                      ? "Voir l'aperçu"
                      : "Retour au formulaire"}
                  </button>
                </div>
                <div className="card-body">
                  {currentView === "form" ? (
                    <SliderForm
                      previewData={previewData}
                      selectedSlider={selectedSlider}
                      onInputChange={handleInputChange}
                      onImageChange={handleImageChange}
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      onCancel={resetForm}
                      onProductSelect={handleProductSelect}
                      selectedProduct={selectedProduct}
                    />
                  ) : (
                    <div className="preview-container">
                      <PreviewLayout
                        type={selectedBannerType}
                        data={selectedSlider || previewData}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ flex: "1" }}>
              <SliderList
                sliders={sliders.filter(
                  (s) => s.bannerType === selectedBannerType
                )}
                selectedBannerType={selectedBannerType}
                selectedSlider={selectedSlider}
                onSliderSelect={handleSliderSelect}
                onSliderAction={handleSliderAction}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderManagement;
