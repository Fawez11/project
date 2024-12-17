// admin/src/components/utils/CustomArrows.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const SamplePrevArrow = () => {
  return (
    <button className="slick-arrow Prev">
      <FontAwesomeIcon icon={faAngleLeft} fontSize={30} />
    </button>
  );
};

export const SampleNextArrow = () => {
  return (
    <button className="slick-arrow Next">
      <FontAwesomeIcon icon={faAngleRight} fontSize={30} />
    </button>
  );
};
