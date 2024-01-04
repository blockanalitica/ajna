import classnames from "classnames";

const Tag = ({ children, className, size = "lg" }) => (
  <div
    className={classnames(
      "rounded-xl bg-gray-21 font-normal",
      {
        "px-4 py-2 text-sm": size === "lg",
        "px-2 py-1 text-xs": size === "md",
        "px-2 py-1 text-[0.65rem]/3": size === "xs",
      },
      className,
    )}
  >
    {children}
  </div>
);

export default Tag;
