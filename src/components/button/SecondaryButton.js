import Link from "next/link";
import classnames from "classnames";

const SecondaryButton = ({ text, href, ...rest }) => {
  let Component = "button";
  if (href) {
    Component = Link;
    rest["href"] = href;
  }

  return (
    <Component
      className={classnames(
        "rounded-3xl border-purple-7 border-2 inline-flex items-center",
        "justify-center px-6 py-1 text-center text-sm hover:bg-purple-7"
      )}
      {...rest}
    >
      {text}
    </Component>
  );
};

export default SecondaryButton;
