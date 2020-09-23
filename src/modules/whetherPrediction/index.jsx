// @flow
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Layout from "components/layout";
import Tabs from "components/tabs";
import Row from "components/Row";
import Col from "components/Col";
import NumberInput from "components/NumberInput";
import Button from "components/button";
import Modal from "components/Modal";
import Loader from "components/loader";
import Alert from "components/Alert";

import { getWeatherRate } from "action/weather";
import { ASYNC_STATUS } from "constants/async";
import windyImage from "assets/image/windy.gif";
import cloudyImage from "assets/image/cloudy.gif";
import mistyImage from "assets/image/misty.gif";
import overCastingImage from "assets/image/overCasting.gif";
import rainnyImage from "assets/image/rainny.gif";
import sunnyImage from "assets/image/sunny.gif";

import "./styles.scss";

type WhetherPredictionProps = {
  getWeatherRate: Function,
  status: String,
  notification: null | Object,
  weather: string | null,
};

type WhetherPredictionState = {};

class WhetherPrediction extends Component<
  WhetherPredictionProps,
  WhetherPredictionState
> {
  state = {
    showModal: false,
    Temperature: "",
    ApparentTemperature: "",
    Humidity: "",
    WindSpeed: "",
    WindBearing: "",
    Visibility: "",
    LoudCover: "",
    Pressure: "",
  };

  onChangeFormField = (field) => {
    this.setState({
      ...this.state,
      ...field,
    });
  };

  onSubmit = () => {
    const {
      Temperature,
      ApparentTemperature,
      Humidity,
      WindBearing,
      WindSpeed,
      Visibility,
      LoudCover,
      Pressure,
    } = this.state;

    this.props.getWeatherRate({
      Temperature: parseFloat(Temperature),
      ApparentTemperature: parseFloat(ApparentTemperature),
      Humidity: parseFloat(Humidity),
      WindBearing: parseFloat(WindBearing),
      WindSpeed: parseFloat(WindSpeed),
      Visibility: parseFloat(Visibility),
      LoudCover: parseFloat(LoudCover),
      Pressure: parseFloat(Pressure),
    });

    this.setState({
      ...this.state,
      showModal: true,
    });
  };

  render() {
    const {
      showModal,
      Temperature,
      ApparentTemperature,
      Humidity,
      WindBearing,
      WindSpeed,
      Visibility,
      LoudCover,
      Pressure,
    } = this.state;

    const { weather, status, notification } = this.props;

    return (
      <Layout>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
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
                                Temperature (Celsius)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="Temperature"
                                  text={Temperature}
                                  onChange={(Temperature) =>
                                    this.onChangeFormField({ Temperature })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Apparent Temperature (Celsius)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="ApparentTemperature"
                                  text={ApparentTemperature}
                                  onChange={(ApparentTemperature) =>
                                    this.onChangeFormField({
                                      ApparentTemperature,
                                    })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Humidity (air g.kg-1)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="Humidity"
                                  text={Humidity}
                                  onChange={(Humidity) =>
                                    this.onChangeFormField({ Humidity })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Wind Speed (Km/h)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="WindSpeed"
                                  text={WindSpeed}
                                  onChange={(WindSpeed) =>
                                    this.onChangeFormField({ WindSpeed })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Wind Bearing (Degrees)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="WindBearing"
                                  text={WindBearing}
                                  onChange={(WindBearing) =>
                                    this.onChangeFormField({ WindBearing })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Visibility (Km)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="Visibility"
                                  text={Visibility}
                                  onChange={(Visibility) =>
                                    this.onChangeFormField({ Visibility })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Saturation 0f air
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="LoudCover"
                                  text={LoudCover}
                                  onChange={(LoudCover) =>
                                    this.onChangeFormField({ LoudCover })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="field-label" sm={12} md={4}>
                                Pressure (millibars)
                              </Col>
                              <Col sm={12} md={6}>
                                <NumberInput
                                  id="Pressure"
                                  text={Pressure}
                                  onChange={(Pressure) =>
                                    this.onChangeFormField({ Pressure })
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Button
                                  onClick={this.onSubmit}
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
                {weather && (
                  <Fragment>
                    <div className="predictedImage">
                      <img
                        src={
                          weather === "Windy"
                            ? windyImage
                            : weather === "cloudy"
                            ? cloudyImage
                            : weather === "overcast"
                            ? overCastingImage
                            : weather === "misty"
                            ? mistyImage
                            : weather === "rainy"
                            ? rainnyImage
                            : weather === "sunny"
                            ? sunnyImage
                            : null
                        }
                        alt="weather"
                      />
                    </div>
                    <div className="predictedWeather">{`It will be ${weather}`}</div>
                    <div className="predictedSupport">{`now you can check what scenes can be shoot in ${weather} condition in scenes tab.`}</div>
                  </Fragment>
                )}
              </div>
            </Modal>
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.weather.status,
    notification: state.weather.notification,
    weather: state.weather.weather,
  };
};

const Actions = { getWeatherRate };

export default connect(mapStateToProps, Actions)(WhetherPrediction);
