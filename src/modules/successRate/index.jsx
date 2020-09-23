// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "components/layout";
import Row from "components/Row";
import Col from "components/Col";
import Input from "components/Input";
import Button from "components/button";
import NumberInput from "components/NumberInput";
import Select from "components/Select";

import { getMovieSuccessRate } from "action/successRate";

import "./styles.scss";
import { ASYNC_STATUS } from "constants/async";
import Loader from "components/loader";
import Alert from "components/Alert";

type SuccessRateProps = {
  getMovieSuccessRate: Function,
  notification: null | Object,
  status: String,
  successRate: String,
};

type SuccessRateState = {
  budget: String,
  genres: String,
  popularity: String,
  actorRate: String,
  actressRate: String,
  runtime: String,
};

class SuccessRate extends Component<SuccessRateProps, SuccessRateState> {
  state = {
    budget: "",
    genres: "",
    popularity: "",
    actorRate: "",
    actressRate: "",
    runtime: "",
  };

  onChangeFormField = (field) => {
    this.setState({
      ...this.state,
      ...field,
    });
  };

  onSubmit = () => {
    const {
      budget,
      genres,
      popularity,
      actorRate,
      actressRate,
      runtime,
    } = this.state;

    this.props.getMovieSuccessRate({
      budget: parseFloat(budget),
      genres: parseFloat(genres),
      popularity: parseFloat(popularity),
      main_actor_rating: parseFloat(actorRate),
      main_actreess_rating: parseFloat(actressRate),
      runtime: parseFloat(runtime) / 10.0,
    });
  };

  render() {
    const {
      budget,
      genres,
      popularity,
      actorRate,
      actressRate,
      runtime,
    } = this.state;
    const { notification, status, successRate } = this.props;
    const genresOptions = [
      { name: "Animation", value: "1" },
      { name: "Adventure", value: "2" },
      { name: "Comedy", value: "3" },
      { name: "Thriller", value: "4" },
      { name: "Romance", value: "5" },
      { name: "Adventure", value: "6" },
      { name: "Action", value: "7" },
      { name: "Horror", value: "8" },
      { name: "Crime", value: "9" },
      { name: "Science & fiction", value: "10" },
      { name: "Mystery", value: "11" },
    ];

    return (
      <Layout>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="success">
            <div className="success-heading">Movie Success Rate</div>
            <div className="success-form">
              <div className="success-form-search">
                <Row>
                  <Col>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Budget
                      </Col>
                      <Col sm={12} md={6}>
                        <Input
                          id="Temperature"
                          placeholder="how many millions"
                          text={budget}
                          onChange={(budget) =>
                            this.onChangeFormField({ budget })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Genres
                      </Col>
                      <Col sm={12} md={6}>
                        <Select
                          id="genres"
                          options={genresOptions}
                          placeholder="Select"
                          selected={genres}
                          onChange={(genres) =>
                            this.onChangeFormField({ genres })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Popularity
                      </Col>
                      <Col sm={12} md={6}>
                        <Input
                          id="Humidity"
                          placeholder="how many millions"
                          text={popularity}
                          onChange={(popularity) =>
                            this.onChangeFormField({ popularity })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Main Actors Rating
                      </Col>
                      <Col sm={12} md={6}>
                        <NumberInput
                          id="WindSpeed"
                          placeholder="Enter in scale of 1 - 10"
                          min="1"
                          max="10"
                          text={actorRate}
                          onChange={(actorRate) =>
                            this.onChangeFormField({ actorRate })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Main Actress Rating
                      </Col>
                      <Col sm={12} md={6}>
                        <NumberInput
                          id="WindSpeed"
                          placeholder="Enter in scale of 1 - 10"
                          min="1"
                          max="10"
                          text={actressRate}
                          onChange={(actressRate) =>
                            this.onChangeFormField({ actressRate })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="field-label" sm={12} md={4}>
                        Runtime
                      </Col>
                      <Col sm={12} md={6}>
                        <NumberInput
                          id="WindSpeed"
                          placeholder="Enter in minutes"
                          min="1"
                          text={runtime}
                          onChange={(runtime) =>
                            this.onChangeFormField({ runtime })
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
                          Count Movie Success Rate
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
            {successRate && (
              <div className="result-container">{`Movie will be success on a rate of ${successRate}%`}</div>
            )}
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.success.status,
    notification: state.success.notification,
    successRate: state.success.successRate,
  };
};

const Actions = { getMovieSuccessRate };

export default connect(mapStateToProps, Actions)(SuccessRate);
