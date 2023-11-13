import classnames from "classnames";

const Tooltop = ({ children, message, className, wrapperClassName }) => (
  <div className={classnames("group relative", wrapperClassName)}>
    {children}

    <div
      className={classnames(
        "hidden bg-gray-20 text-white text-xs rounded-lg px-2 py-1 absolute z-100",
        "group-hover:inline-block bottom-full pointer-events-none",
        "text-center left-1/2 -translate-x-1/2 font-normal whitespace-nowrap w-max",
        className
      )}
    >
      {message}
      <svg
        className="absolute text-gray-20 h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
      >
        <polygon points="0,0 127.5,127.5 255,0" fill="currentColor" />
      </svg>
    </div>
  </div>
);

export default Tooltop;
