import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ExternalLink(props) {
  let { children, ...rest } = props;
  if (!children) {
    children = <FontAwesomeIcon icon={faArrowUpRightFromSquare} />;
  }
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export default ExternalLink;
