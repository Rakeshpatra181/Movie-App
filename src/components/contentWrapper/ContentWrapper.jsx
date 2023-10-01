import React from "react";

import "./content.scss";

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
