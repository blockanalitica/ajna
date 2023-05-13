import Link from "next/link";
import PrimaryButton from "../button/PrimaryButton";
import TwoOverlayingCryptoIcons from "../icon/TwoOverlayingCryptoIcons";
import TagComp from "../tags/TagComp";
import CardBackground from "./CardBackgroud";

const MiningCard = () => (
<CardBackground styling="px-6 py-4 ">
<div className="flex justify-between w-full items-center py-3">
  <div className="flex justify-center items-center">
    <TwoOverlayingCryptoIcons icon1="ETH" icon2="DAI" size="50" />
  </div>
  <h5 className="text-xl font-syncopate font-bold tracking-tight text-gray-900 dark:text-white">
    ETH / DAI
  </h5>
  <Link href="#" className="font-rubik flex justify-center items-center px-3 text-sm">
    <div className="rounded-full p-px mx-0.5 bg-white"></div>
    <div className="rounded-full p-px mx-0.5 bg-white"></div>
    <div className="rounded-full p-px mx-0.5 bg-white"></div>
  </Link>
</div>
<div className="flex-auto py-5 px-4">
    <div className="flex justify-between items-center">
        <div className="text-center flex flex-col items-center">
            <div className="text-2xl font-bold">1.0</div>
            <div className="flex py-3 justify-normal items-center">
                <div className="text-gray-10 font-bold">ETH</div>
                <TagComp className="mx-2" title="Collateral"/>
            </div>
        </div>
        <div className="text-center text-3xl px-5">
            /
        </div>
        <div className="text-center flex flex-col items-center">
            <div className="text-2xl font-bold">1,235.29</div>
            <div className="flex py-3 justify-normal items-center">
                <div className="text-gray-10 mx-2 font-bold">DAI</div>
                <TagComp className="mx-2" title="Quote"/>
            </div>
        </div>
    </div>
</div>
<div className="w-full h-px opacity-50 bg-gray-10 border-0" />
<div className="flex flex-col w-full py-3 px-2 text-xs">
    <div className="flex justify-between w-full py-2">
        <p className="text-gray-10">Total Value Locked</p>
        <p className="font-bold">$1,000,000.00</p>
    </div>
    <div className="flex justify-between py-2">
        <p className="text-gray-10">Earn APR</p>
        <p className="font-bold">2.70%</p>
    </div>
    <div className="flex justify-between py-2">
        <p className="text-gray-10">Ajna Burned in Auction</p>
        <p className="text-right font-bold">957 🔥</p>
    </div>
</div>
<div className="flex-auto w-full px-5 py-3 mb-3 text-center">
    <PrimaryButton title="Pool Details ->" location="/pools/ETH-DAI" styling="w-full py-3" />
</div>
</CardBackground>
)

export default MiningCard;