import { Routes, Route } from "react-router-dom";
import { NETWORKS } from "@/networks";
import SimpleRedirect from "@/components/simpleRedirect/SimpleRedirect";
import Layout from "@/app/layout";
import LayoutSimple from "@/app/layoutSimple";
import Error404 from "@/app/404";
import V2Homepage from "@/app/v2/page";
import V2Pools from "@/app/v2/pools/page";
import V2Pool from "@/app/v2/pools/address/page";
import PoolWallets from "@/app/v2/pools/address/positions/page";
import V2Tokens from "@/app/v2/tokens/page";
import V2Token from "@/app/v2/tokens/address/page";
import Wallets from "@/app/v2/wallets/page";
import Wallet from "@/app/v2/wallets/address/page";
import TimeMachine from "@/app/v2/wallets/address/time-machine/page";
import WalletPoolPosition from "@/app/v2/wallets/address/poolAddress/page";
import Buckets from "@/app/v2/pools/address/buckets/page";
import Bucket from "@/app/v2/pools/address/buckets/index/page";
import V2Auctions from "@/app/v2/auctions/page";
import Auction from "@/app/v2/auctions/auction_uid/page";
import V2Grants from "@/app/v2/grants/page";
import ReserveAuction from "@/app/v2/reserve-auctions/uid/page";
import Notifications from "@/app/v2/notifications/page";
import V4NetworkHomepage from "@/app/v4/network/page";
import V4Pools from "@/app/v4/network/pools/page";
import V4Pool from "@/app/v4/network/pools/address/page";
import V4PoolWallets from "@/app/v4/network/pools/address/positions/page";
import V4Tokens from "@/app/v4/network/tokens/page";
import V4Token from "@/app/v4/network/tokens/address/page";
import V4Wallets from "@/app/v4/network/wallets/page";
import V4Wallet from "@/app/v4/network/wallets/address/page";
import V4TimeMachine from "@/app/v4/network/wallets/address/time-machine/page";
import V4WalletPoolPosition from "@/app/v4/network/wallets/address/poolAddress/page";
import V4Buckets from "@/app/v4/network/pools/address/buckets/page";
import V4Bucket from "@/app/v4/network/pools/address/buckets/index/page";
import V4Auctions from "@/app/v4/network/auctions/page";
import V4Auction from "@/app/v4/network/auctions/auction_uid/page";
import V4Grants from "@/app/v4/network/grants/page";
import V4ReserveAuction from "@/app/v4/network/reserve-auctions/uid/page";
import V4Notifications from "@/app/v4/network/notifications/page";
import V4Homepage from "@/app/v4/page";

const AjnaRoutes = () => {
  const routes = {
    v2: [
      { path: "", element: <V2Homepage /> },
      { path: "/pools", element: <V2Pools /> },
      { path: "/pools/:address", element: <V2Pool /> },
      { path: "/pools/:address/positions", element: <PoolWallets /> },
      { path: "/pools/:address/buckets", element: <Buckets /> },
      { path: "/pools/:address/buckets/:index", element: <Bucket /> },
      { path: "/tokens", element: <V2Tokens /> },
      { path: "/tokens/:address", element: <V2Token /> },
      { path: "/wallets", element: <Wallets /> },
      { path: "/wallets/:address", element: <Wallet /> },
      { path: "/wallets/:address/time-machine", element: <TimeMachine /> },
      { path: "/wallets/:address/:poolAddress", element: <WalletPoolPosition /> },
      { path: "/auctions", element: <V2Auctions /> },
      { path: "/auctions/:auction_uid", element: <Auction /> },
      {
        path: "/reserve-auctions",
        element: <SimpleRedirect replace to="/auctions" beSmart />,
      },
      { path: "/reserve-auctions/:uid", element: <ReserveAuction /> },
      { path: "/grants", element: <V2Grants /> },
      { path: "/notifications", element: <Notifications /> },
    ],
    v3: [
      { path: "", element: <V4NetworkHomepage /> },
      { path: "/pools", element: <V4Pools /> },
      { path: "/pools/:address", element: <V4Pool /> },
      { path: "/pools/:address/positions", element: <V4PoolWallets /> },
      { path: "/pools/:address/buckets", element: <V4Buckets /> },
      { path: "/pools/:address/buckets/:index", element: <V4Bucket /> },
      { path: "/tokens", element: <V4Tokens /> },
      { path: "/tokens/:address", element: <V4Token /> },
      { path: "/wallets", element: <V4Wallets /> },
      { path: "/wallets/:address", element: <V4Wallet /> },
      { path: "/wallets/:address/time-machine", element: <V4TimeMachine /> },
      { path: "/wallets/:address/:poolAddress", element: <V4WalletPoolPosition /> },
      { path: "/auctions", element: <V4Auctions /> },
      { path: "/auctions/:auction_uid", element: <V4Auction /> },
      {
        path: "/reserve-auctions",
        element: <SimpleRedirect replace to="/auctions" beSmart />,
      },
      { path: "/reserve-auctions/:uid", element: <V4ReserveAuction /> },
      { path: "/grants", element: <V4Grants /> },
      { path: "/notifications", element: <V4Notifications /> },
    ],
    v4: [
      { path: "", element: <V4NetworkHomepage /> },
      { path: "/pools", element: <V4Pools /> },
      { path: "/pools/:address", element: <V4Pool /> },
      { path: "/pools/:address/positions", element: <V4PoolWallets /> },
      { path: "/pools/:address/buckets", element: <V4Buckets /> },
      { path: "/pools/:address/buckets/:index", element: <V4Bucket /> },
      { path: "/tokens", element: <V4Tokens /> },
      { path: "/tokens/:address", element: <V4Token /> },
      { path: "/wallets", element: <V4Wallets /> },
      { path: "/wallets/:address", element: <V4Wallet /> },
      { path: "/wallets/:address/time-machine", element: <V4TimeMachine /> },
      { path: "/wallets/:address/:poolAddress", element: <V4WalletPoolPosition /> },
      { path: "/auctions", element: <V4Auctions /> },
      { path: "/auctions/:auction_uid", element: <V4Auction /> },
      {
        path: "/reserve-auctions",
        element: <SimpleRedirect replace to="/auctions" beSmart />,
      },
      { path: "/reserve-auctions/:uid", element: <V4ReserveAuction /> },
      { path: "/grants", element: <V4Grants /> },
      { path: "/notifications", element: <V4Notifications /> },
    ],
  };

  const allRoutes = [];
  Object.entries(NETWORKS).forEach(([version, networks]) => {
    networks.forEach((network) => {
      routes[version].forEach((route) => {
        let v = "";
        if (version !== "v4") {
          v = `${version}/`;
        }
        const url = `${v}${network.key}${route.path}`;
        allRoutes.push(<Route key={url} path={url} element={route.element} />);
      });
    });
  });

  return (
    <Routes>
      <Route path="/">
        <Route element={<LayoutSimple />}>
          <Route index element={<V4Homepage />} />
        </Route>

        <Route element={<Layout />}>{allRoutes.map((route) => route)}</Route>

        {/* Catch all */}
        <Route element={<LayoutSimple />}>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AjnaRoutes;
