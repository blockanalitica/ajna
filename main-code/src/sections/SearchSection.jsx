import PrimaryButton from "@/components/button/PrimaryButton";

const SearchSection = () => (
    <section className="mx-auto max-w-9xl flex justify-between bg-gray-10">
        <div className="=">
        </div>
        <div>
            <SearchSection onSearch={(name)=> console.log({name})} />
        </div>
        <div className="flex flex-row justify-normal">
            <PrimaryButton title="Borrow" location="/"  />
            <PrimaryButton title="Lend" location="/" />
        </div>
    </section>
)

export default SearchSection;