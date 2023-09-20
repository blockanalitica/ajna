import { Link } from "react-router-dom";
import classnames from "classnames";
import ExternalLink from "@/components/externalLink/ExternalLink";

const SecondaryButton = ({ text, to, href, ...rest }) => {
  let Component = "button";
  if (to) {
    Component = Link;
    rest["to"] = to;
  }
  if (href) {
    Component = ExternalLink;
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
