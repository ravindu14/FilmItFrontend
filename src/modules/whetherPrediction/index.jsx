// @flow
import React, { Component } from "react";

import Layout from "components/layout";
import Tabs from "components/tabs";

import "./styles.scss";
import Row from "components/Row";
import Col from "components/Col";
import Input from "components/Input";
import Button from "components/button";
import Modal from "components/Modal";

type WhetherPredictionProps = {};

type WhetherPredictionState = {};

class WhetherPrediction extends Component<
  WhetherPredictionProps,
  WhetherPredictionState
> {
  state = {
    showModal: false,
  };

  render() {
    const { showModal } = this.state;

    return (
      <Layout>
        <div className="whether">
          <Tabs
            items={[
              {
                title: "Whether",
                content: (
                  <div className="whether-form">
                    <div className="whether-form-search">
                      <Row>
                        <Col>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Temperature
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="Temperature" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Apparent Temperature
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="ApparentTemperature" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Humidity
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="Humidity" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Wind Speed
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="WindSpeed" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Wind Bearing
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="WindBearing" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Visibility
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="Visibility" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Loud Cover
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="LoudCover" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Pressure
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="Pressure" />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="field-label" sm={12} md={4}>
                              Summary
                            </Col>
                            <Col sm={12} md={6}>
                              <Input id="Summary" />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Button
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    showModal: true,
                                  });
                                }}
                                type={Button.TYPE.SUCCESS}
                              >
                                Predict whether condition
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ),
              },
              {
                title: "Scenes",
                content: <div className="whether-scene"> hello scene</div>,
              },
            ]}
          />
          <Modal
            showModal={showModal}
            className="modal-content"
            onClose={() => {
              this.setState({ ...this.state, showModal: false });
            }}
          >
            <div className="modal-container">
              <Row>
                <Col>
                  <div className="modal-header">Predicted Whether Result</div>
                </Col>
              </Row>
              <hr />
            </div>
          </Modal>
        </div>
      </Layout>
    );
  }
}

export default WhetherPrediction;
