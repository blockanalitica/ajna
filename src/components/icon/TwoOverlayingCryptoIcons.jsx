import CryptoIcon from "./CryptoIcon";

const TwoOverlayingCryptoIcons = ({ icon1, icon2, size }) => {
  return (
    <>
      <CryptoIcon name={icon1} className="absolute left-[25%] z-10" size={size} />
      <CryptoIcon name={icon2} className="ml-6" size={size} />
    </>
  );
};

export default TwoOverlayingCryptoIcons;
