import Link from "next/link";
import classnames from "classnames";

const Button = ({ text, href, ...rest }) => {
  let Component = "button";
  if (href) {
    Component = Link;
    rest["href"] = href;
  }

  return (
    <Component
      className={classnames(
        "rounded-3xl bg-purple-7 hover:bg-purple-8 inline-flex items-center",
        "justify-center px-6 py-3 text-center sm:font-bold"
      )}
      {...rest}
    >
      {text}
    </Component>
  );
};

export default Button;
