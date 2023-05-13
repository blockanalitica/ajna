import Link from "next/link";
import PrimaryButton from "../button/PrimaryButton";
import TwoOverlayingCryptoIcons from "../icon/TwoOverlayingCryptoIcons";
import TagComp from "../tags/TagComp";
import CardBackground from "./CardBackgroud";

const MiningCard = () => (
  <div className=" m-4 px-2 py-2 bg-gray-23 flex flex-col rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between items-center py-3">
      <div className="flex justify-center items-center px-5">
        <CryptoIcon name="DAI" size="40" />
        <CryptoIcon name="ETH" size="40" />
      </div>
      <h5 className="text-xl font-syncopate font-bold tracking-tight text-gray-900 dark:text-white">
        ETH / DAI
      </h5>
      <Link
        href="#"
        className="font-rubik flex justify-center items-center px-5 text-sm"
      >
        <div className="rounded-full p-0.5 mx-1 bg-white"></div>
        <div className="rounded-full p-0.5 mx-1 bg-white"></div>
        <div className="rounded-full p-0.5 mx-1 bg-white"></div>
      </Link>
    </div>
    <div className="flex-auto py-1 px-4">
      <div className="flex justify-between items-center">
        <div className="text-center flex flex-col items-center">
          <div className="text-2xl font-bold">1.0</div>
          <div className="flex py-3 justify-normal items-center">
            <div className="text-gray-10 font-bold">ETH</div>
            <TagComp className="mx-2" title="Collateral" />
          </div>
        </div>
        <div className="text-center text-5xl px-5">/</div>
        <div className="text-center flex flex-col items-center">
          <div className="text-2xl font-bold">1,235.29</div>
          <div className="flex py-3 justify-normal items-center">
            <div className="text-gray-10 mx-2 font-bold">DAI</div>
            <TagComp className="mx-2" title="Quote" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex-auto">
      <hr className="text-gray-10 opacity-30" />
    </div>
    <div className="flex-auto py-3 px-2 text-sm">
      <div className="flex justify-between py-3">
        <p className="text-gray-10">Total Value Locked</p>
        <p className="font-bold">$1,000,000.00</p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-gray-10">APR</p>
        <p className="font-bold">2.70%</p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-gray-10">Ajna Burned in Auction</p>
        <p className="text-right font-bold">957 🔥</p>
      </div>
    </div>
    <div className="flex-auto py-2 text-center">
      <PrimaryButton title="Pool Details ->" location="/pools/ETH-DAI" />
    </div>
  </div>
);

export default MiningCard;
