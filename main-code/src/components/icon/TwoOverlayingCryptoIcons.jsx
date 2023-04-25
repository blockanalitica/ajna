import CryptoIcon from "./CryptoIcon";

const TwoOverlayingCryptoIcons = ({ icon1, icon2, size }) => {
  return (
    <div className="">

      <div className="relative w-16 h-10 flex justify-center items-center">

        <div className="absolute z-20 start-0 top-0">
        <CryptoIcon name={icon1} size={size} />
        </div>
        <div className="absolute z-10 left-5 top-0 ">
        <CryptoIcon name={icon2} size={size} />
        </div>
    </div>

    </div>
  );
}

export default TwoOverlayingCryptoIcons;