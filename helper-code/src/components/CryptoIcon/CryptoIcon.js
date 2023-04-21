import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { ReactComponent as cbethIcon } from "../../images/crypto/color/cbeth.svg";
import { ReactComponent as compIcon } from "../../images/crypto/color/comp.svg";
import { ReactComponent as daiIcon } from "../../images/crypto/color/dai.svg";
import { ReactComponent as ethIcon } from "../../images/crypto/color/eth.svg";
import { ReactComponent as linkIcon } from "../../images/crypto/color/link.svg";
import { ReactComponent as stEthIcon } from "../../images/crypto/color/steth.svg";
import { ReactComponent as uniIcon } from "../../images/crypto/color/uni.svg";
import { ReactComponent as usdcIcon } from "../../images/crypto/color/usdc.svg";
import { ReactComponent as wbtcIcon } from "../../images/crypto/color/wbtc.svg";
import { ReactComponent as debankIcon } from "../../images/debank.svg";
import { ReactComponent as etherscanIcon } from "../../images/etherscan.svg";
import { ReactComponent as zapperIcon } from "../../images/zapper.svg";

function CryptoIcon(props) {
  const { name, size, address, ...rest } = props;

  const btnRef = useRef(null);
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    if (btnRef.current) {
      setReady(true);
    }
  }, [btnRef]);

  const mapping = {
    DAI: daiIcon,
    TDAI: daiIcon,
    sDAI: daiIcon,
    COMP: compIcon,
    ETH: ethIcon,
    LINK: linkIcon,
    UNI: uniIcon,
    USDC: usdcIcon,
    WBTC: wbtcIcon,
    WETH: ethIcon,
    TWETH: ethIcon,
    wstETH: stEthIcon,
    cbETH: cbethIcon,
    etherscan: etherscanIcon,
    debank: debankIcon,
    zapper: zapperIcon,
  };
  const Icon = mapping[name];
  if (!Icon) {
    return name;
  }

  return (
    <>
      <Icon {...rest} width={size} height={size} ref={btnRef} />
      {ready ? (
        <UncontrolledTooltip placement="bottom" target={btnRef}>
          {name}
        </UncontrolledTooltip>
      ) : null}
    </>
  );
}

CryptoIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

CryptoIcon.defaultProps = {
  size: 15,
};

export default CryptoIcon;
