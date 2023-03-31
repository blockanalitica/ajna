import React from "react";
import { Container } from "reactstrap";
import Address from "../components/Address/Address";
import Card from "../components/Card/Card";
import CryptoIcon from "../components/CryptoIcon/CryptoIcon";
import CurrencySwitch from "../components/CurrencySwitch/CurrencySwitch";
import DateTimeAgo from "../components/DateTime/DateTimeAgo";

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
          <li>DateTimeAgo: <DateTimeAgo /></li>
        </ul>        
      </div>
    </Container>
  );
}

export default HomePage;
