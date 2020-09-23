// @flow
import React, { Component } from "react";

import Layout from "components/layout";

import "./styles.scss";

type SuccessRateProps = {};

type SuccessRateState = {};

class SuccessRate extends Component<SuccessRateProps, SuccessRateState> {
  render() {
    return (
      <Layout>
        <div className="analysis">hi success rate</div>
      </Layout>
    );
  }
}

export default SuccessRate;
