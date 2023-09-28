import classnames from "classnames";

const Tag = ({ children, className }) => (
  <div className={classnames("text-sm rounded-xl bg-gray-21 px-4 py-2", className)}>
    {children}
  </div>
);

export default Tag;
