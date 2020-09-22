// @flow
import React, { Component } from "react";

import Layout from "components/layout";

import "./styles.scss";

type ScriptAnalysisProps = {};

type ScriptAnalysisState = {};

class ScriptAnalysis extends Component<
  ScriptAnalysisProps,
  ScriptAnalysisState
> {
  render() {
    return (
      <Layout>
        <div className="analysis">hi analysis</div>
      </Layout>
    );
  }
}

export default ScriptAnalysis;
