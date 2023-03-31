import React from "react";
import { Container } from "reactstrap";
import Address from "../components/Address/Address";
import Card from "../components/Card/Card";
import CryptoIcon from "../components/CryptoIcon/CryptoIcon";
import CurrencySwitch from "../components/CurrencySwitch/CurrencySwitch";
import DateTimeAgo from "../components/DateTime/DateTimeAgo";
import ExternalLink from "../components/ExternalLink/ExternalLink";
import GraphSwitch from "../components/GraphSwitch/GraphSwitch";
import Info from "../components/Info/Info";
import Loader from "../components/Loader/Loader";
import RangeSlider from "../components/RangeSlider/RangeSlider";
import SearchInput from "../components/SearchInput/SearchInput";
import Select from "../components/Select/Select";
import SideTabContent from "../components/SideTab/SideTabContent";
import SideTabNav from "../components/SideTab/SideTabNav";
import SimpleRedirect from "../components/SimpleRedirect/SimpleRedirect";
import Stat from "../components/Stat/Stat";
import StatsBar from "../components/Stats/StatsBar";
import Switch from "../components/Switch/Switch";
import TabCard from "../components/TabCard/TabCard";
//import LinkTable from "../components/Table/LinkTable";
//import RemoteTable from "../components/Table/RemoteTable";
// TODO: resolve problem with bootstrap table
import IconTabs from "../components/Tabs/IconTabs";
import TimeSwitch from "../components/TimeSwitch/TimeSwitch";
import Title from "../components/Title/Title";
import Value from "../components/Value/Value";

function HomePage(props) {
  return (
    <Container>
      <div className="text-center">
        <h1 className="pb-4">Testing components</h1>
        <ul>
          <li>Address: <Address value="0x2342334234e2343e2w3312" /></li>
          <li>Card: <Card title='title' children={<Address value="0x2342334234e2343e2w3312" />}/></li>
          <li>CryptoIcon: <CryptoIcon name="DAI" size="20" /></li>
          <li>CurrencySwitch: <CurrencySwitch /></li>
          <li>DateTimeAgo: <DateTimeAgo /></li>
          <li>ExternalLink: <ExternalLink /></li>
          <li>GraphSwitch: <GraphSwitch /></li>
          <li>Info: <Info /></li>
          <li>Loader: <Loader /></li>
          <li>RangeSlider: <RangeSlider title="title" /></li>
          <li>SearchInput: <SearchInput onSearch={() => console.log("log me")} /></li>
          <li>Select: <Select /></li>
          <li>SideTab: <SideTabContent activeTab="a string" tabs={[{id: "sdf", content: <CurrencySwitch />}]}/></li>
          <li>SideTab: <SideTabNav activeTab="a string" toggleTab={() => console.log("log me")} tabs={[{id: "sdf", text: "some text"}]}/></li>
          {/* <li>SideTabNav: <SimpleRedirect /></li> --> */}
          <li>Stat: <Stat /></li>
          <li>Stats: <StatsBar stats={[{title: "title", bigValue:"12", normalValue:"23", smallValue:"1" }]} /></li>
          <li>Switch:           
          <Switch
            label="show only non-insolvent"
            className="mb-2"
            checked={true}
            onCheckedChange={(checked) => console.log(checked)}
          /></li>
          <li>TabCard: <TabCard tabs={["tab1", "tab2"]} fullHeight={false} /></li>
          {/* <li>LinkTable: <LinkTable /></li>
          <li>RemoteTable: <RemoteTable page={12} pageSize={23} totalPageSize={230} /></li> */}
          <li>IconTabs: <IconTabs tabs={["tab1", "tab2"]} fullHeight={false} /></li>
          <li>Title: <Title tag="title">Title</Title> </li>
          <li>TimeSwitch: <TimeSwitch /></li>
          <li>Value: <Value /></li>
        </ul>        
      </div>
    </Container>
  );
}

export default HomePage;
