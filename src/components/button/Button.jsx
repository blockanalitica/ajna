import { Link } from "react-router-dom";
import classnames from "classnames";

const Button = ({ text, to, ...rest }) => {
  let Component = "button";
  if (to) {
    Component = Link;
    rest["to"] = to;
  }

  return (
    <Component
      className={classnames(
        "rounded-3xl bg-purple-7 hover:bg-purple-8 inline-flex items-center",
        "justify-center px-6 py-3 text-center sm:font-bold",
      )}
      {...rest}
    >
      {text}
    </Component>
  );
};

export default Button;
