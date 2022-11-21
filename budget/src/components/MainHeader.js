// import React from "react";

import React from "react";
import { Header } from "semantic-ui-react";

const MainHeader = ({ title, type = "h1" }) => (
  <Header as={type}>{title}</Header>
);

export default MainHeader;
