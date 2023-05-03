import SearchBar from "@/components/SearchInput/Search";
//import SearchInput from "@/components/SearchInput/SearchInput";
import SwitchDisplays from "@/components/switch/DisplaySwitch";
import { useState } from "react";

const SearchSection = ( {showTimePicker = true}) => {
    const displayOptions = [
        { key: "24H", value: "24H" },
        { key: "7D", value: "7D" },
        { key: "30D", value: "30D" },
        { key: "1Y", value: "1Y" },
    ];

    const [curentlyDisplayed, setCurrentDisplay] = useState(displayOptions[0].key);

    return (
    <section className="mx-auto max-w-9xl flex flex-row items-center justify-between px-10">
        <div className="flex flex-row">
           Home &gt; Pools 
        </div>
        <div className="ml-40">
             <SearchBar />

        </div>
         {showTimePicker && 
        <div>
            <SwitchDisplays displayOptions={displayOptions} active={curentlyDisplayed} setActive={setCurrentDisplay} 
            className="px-6 py-2"
            />
        </div>
        }
    </section>
)}

export default SearchSection;