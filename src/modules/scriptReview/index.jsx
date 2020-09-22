// @flow
import React, { Component } from "react";

import Layout from "components/layout";

import "./styles.scss";

type ScriptReviewProps = {};

type ScriptReviewState = {};

class ScriptReview extends Component<ScriptReviewProps, ScriptReviewState> {
  render() {
    return (
      <Layout>
        <div className="analysis">hi review</div>
      </Layout>
    );
  }
}

export default ScriptReview;
