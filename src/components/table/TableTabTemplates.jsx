import TwoOverlayingCryptoIcons from "@/components/icon/TwoOverlayingCryptoIcons";
import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const table_tab_2coins_plus_title = ({
    title1="title1", title2="title2",
    icon1=null, icon2=null,
  }) => (
    <div className="flex justify-start items-center p-4">
      <span className="relative flex justify-start items-center p-4">
        <TwoOverlayingCryptoIcons icon1={icon1} icon2={icon2} size={30} />
      </span>
      <span className="font-bold">
        {title1} / {title2}
      </span>
    </div>
  )
  
const table_tab_title_coin_subtitle_val_change = ({
    title=0, subtitle=0, icon=null,
    title_prefix=null, subtitle_prefix=null,
    title_val_change=0, subtitle_val_change=0,
    subtitle_dash_if_zero=false,
    title_val_change_prefix=null, subtitle_val_change_prefix=null,
    }) => (
    <div className="flex justify-end items-center p-4">
        <div className="flex flex-col items-end">
        <div className="flex justify-start items-center">
            <Value
            value={title}
            prefix={title_prefix}
            decimals={2}
            compact
            suffix={icon}
            />
            <ValueChange
            value={title_val_change}
            decimals={2}
            compact
            hideIfZero
            className="ml-2"
            prefix={title_val_change_prefix}
            />
        </div>
        <div className="flex justify-start items-center text-gray-6 text-sm">
            <Value
            value={subtitle}
            prefix={subtitle_prefix}
            dashIfZero={subtitle_dash_if_zero}
            decimals={2}
            compact
            />
            <ValueChange
            value={subtitle_val_change}
            decimals={2}
            compact
            hideIfZero
            className="ml-2"
            prefix={subtitle_val_change_prefix}
            />
        </div>
        </div>
    </div>
)

const table_tab_tag = (title=0) => (
    <div className="flex justify-end items-center p-4">
    <TagComp
        title={
        <Value
            value={title}
            decimals={2}
            suffix={"%"}
        />
        }
    />
    </div>
)


  export {
    table_tab_2coins_plus_title,
    table_tab_title_coin_subtitle_val_change,
    table_tab_tag
}