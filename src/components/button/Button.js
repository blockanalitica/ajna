import Link from "next/link";

const Button = ({ text, href, ...rest }) => {
  let Component = "button";
  if (href) {
    Component = Link;
    rest["href"] = href;
  }

  return (
    <Component
      className="rounded-3xl bg-purple-7 hover:bg-purple-8 inline-flex items-center justify-center px-6 py-3 font-bold text-center"
      {...rest}
    >
      {text}
    </Component>
  );
};

export default Button;
