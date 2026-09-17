import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";

export default function AllHeaders() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white ">
      <TopHeader/>
      <BottomHeader/>
    </div>
  )
}
