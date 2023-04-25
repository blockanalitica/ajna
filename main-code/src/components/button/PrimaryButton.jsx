import { joinClassNames } from "@/utils/helperFunc";
import Link from "next/link";

const PrimaryButton = ({ title="title", location="/", styling="px-5 py-3" }) => (
    <Link
        href={ location } 
        className={ joinClassNames("rounded-full bg-purple-7 hover:bg-purple-8 inline-flex items-center justify-center font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300",
        styling) }
    >
        { title }
    </Link>
)

export default PrimaryButton;