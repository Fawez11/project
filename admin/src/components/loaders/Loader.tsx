// admin/src/components/loaders/Loader.tsx
import { useEffect } from "react";
import "../../styles/loader.css";

interface LoaderProps {
  fullScreen?: boolean;
}

function Loader({ fullScreen = false }: LoaderProps) {
  useEffect(() => {
    if (fullScreen) {
      document.body.style.position = "relative";
      document.body.style.minHeight = "100vh";
      return () => {
        document.body.style.position = "";
        document.body.style.minHeight = "";
      };
    }
  }, [fullScreen]);

  return (
    <div className={`loader ${fullScreen ? "loader-fullscreen" : ""}`}></div>
  );
}

export default Loader;
