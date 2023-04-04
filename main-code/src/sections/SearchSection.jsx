import PrimaryButton from "@/components/button/PrimaryButton";
import SearchInput from "@/components/SearchInput/SearchInput";

const SearchSection = ( {showMiddleButton = true}) => (
    <section className="mx-auto max-w-9xl flex flex-row items-center justify-between px-10">
        <div className="flex flex-row">
            &gt; Pools &gt; ETH / DAI
        </div>
        {showMiddleButton && 
        <div>
            <PrimaryButton title="24H | 7D | 30D | [infinity logo]" location="/" />
        </div>
        }
        <div>
             <SearchInput />

        </div>
    </section>
)

export default SearchSection;