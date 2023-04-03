const TagComp = ({ title, className }) => (
    <a className={`${className} flex text-sm  justify-center cursor-pointer rounded-lg bg-gray-21 hover:bg-gray-18 align-middle px-2 py-2`}>
        { title }
    </a>
)

export default TagComp;
