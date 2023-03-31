import React from "react";
import { Container } from "reactstrap";
import Address from "../components/Address/Address";
import Card from "../components/Card/Card";
import CryptoIcon from "../components/CryptoIcon/CryptoIcon";
import CurrencySwitch from "../components/CurrencySwitch/CurrencySwitch";
import DateTimeAgo from "../components/DateTime/DateTimeAgo";
import ExternalLink from "../components/ExternalLink/ExternalLink";
import Graph from "../components/Graph/Graph";
import GraphSwitch from "../components/GraphSwitch/GraphSwitch";
import Info from "../components/Info/Info";
import Loader from "../components/Loader/Loader";
import RangeSlider from "../components/RangeSlider/RangeSlider";
import SearchInput from "../components/SearchInput/SearchInput";
import Select from "../components/Select/Select";
import SideTab from "../components/SideTab/SideTab";
import SimpleRedirect from "../components/SimpleRedirect/SimpleRedirect";
import Stat from "../components/Stat/Stat";
import Stats from "../components/Stats/Stats";
import Switch from "../components/Switch/Switch";
import TabCard from "../components/TabCard/TabCard";
import Table from "../components/Table/Table";
import Tabs from "../components/Tabs/Tabs";
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
          <li>Graph: <Graph /></li>
          <li>GraphSwitch: <GraphSwitch /></li>
          <li>Info: <Info /></li>
          <li>Loader: <Loader /></li>
          <li>RangeSlider: <RangeSlider /></li>
          <li>SearchInput: <SearchInput /></li>
          <li>Select: <Select /></li>
          <li>SideTab: <SideTab /></li>
          <li>SimpleRedirect: <SimpleRedirect /></li>
          <li>Stat: <Stat /></li>
          <li>Stats: <Stats /></li>
          <li>Switch: <Switch /></li>
          <li>TabCard: <TabCard /></li>
          <li>Table: <Table /></li>
          <li>Tabs: <Tabs /></li>
          <li>TimeSwitch: <TimeSwitch /></li>
          <li>Value: <Value /></li>
        </ul>        
      </div>
    </Container>
  );
}

export default HomePage;
