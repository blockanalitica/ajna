import Link from "next/link";

const SpecialButton = ({ title="title", location="/" }) => (
        <Link 
            href={ location }
            className="m-4 p-0.5 rounded-full font-rubik bg-gradient-to-r from-ajna-special-from to-ajna-special-to"
        >
            <span className="block px-8 py-4 font-semibold rounded-full text-white text-xl bg-black hover:bg-transparent">
            { title }
            </span>
        </Link>
);


export default SpecialButton;