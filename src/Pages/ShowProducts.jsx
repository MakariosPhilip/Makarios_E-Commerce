import { useParams } from "react-router-dom";
import SlideProduct from "../Components/SlideProduct";
import AllHeaders from "../Components/AllHeaders";

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="mt-70 md:mt-50 m-4">
      <AllHeaders />
      <SlideProduct title={id} />;
    </div>
  );
}
