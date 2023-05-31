"use client";
import classnames from "classnames";
import { useState } from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { copyTextToClipboard } from "../../utils/clipboard.js";

const CopyToClipboard = ({ text, className, ...rest }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [timer, setTimer] = useState();

  const btnClick = () => {
    copyTextToClipboard(text);
    setIsCopied(true);

    clearTimeout(timer);
    const tmr = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    setTimer(tmr);
  };

  return (
    <Tooltip message={isCopied ? "Address copied!" : "Click to copy"} className="w-28">
      <FontAwesomeIcon
        onClick={btnClick}
        icon={faCopy}
        className={classnames("cursor-pointer hover:text-ajna-lavender", className)}
        {...rest}
      />
    </Tooltip>
  );
};

export default CopyToClipboard;
