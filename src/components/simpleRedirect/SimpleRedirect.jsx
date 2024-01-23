import { Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import { smartLocationParts } from "@/utils/url";
import urlJoin from "url-join";

function SimpleRedirect(props) {
  let { to, replace, state, beSmart } = props;
  const params = useParams();
  const location = useLocation();

  if (beSmart === true) {
    const { version, network } = smartLocationParts(location);
    to = urlJoin("/", version, network, to);
  }

  const redirectWithParams = generatePath(to, params);

  return <Navigate to={redirectWithParams} replace={replace} state={state} />;
}

export default SimpleRedirect;
