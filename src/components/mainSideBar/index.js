// @flow
import React, { PureComponent } from "react";
import { Link, location, withRouter } from "react-router-dom";

import Icon from "components/icon";

import "./styles.scss";

type SidebarProps = {
  location: location,
};

type SidebarState = {
  activeMainCategory: string,
  showContent: boolean,
};

class Sidebar extends PureComponent<SidebarProps, SidebarState> {
  CATEGORIES = {
    DASHBOARD: "dashboard",
    PURCHASES: "purchases",
    INVENTORY: "inventory",
    SALES: "sales",
    CUSTOMERS: "customers",
  };

  constructor(props) {
    super(props);

    this.state = {
      activeMainCategory: this.CATEGORIES.DASHBOARD,
    };

    // $FlowFixMe
    this.onClickMainCategory = this.onClickMainCategory.bind(this);
    // $FlowFixMe
    this.showSideMenu = this.showSideMenu.bind(this);
    // $FlowFixMe
    this.hideSideMenu = this.hideSideMenu.bind(this);
    // $FlowFixMe
    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;

    this.setState({
      ...this.state,
      activeMainCategory:
        pathname !== "/" && localStorage.getItem("active-sidebar-category")
          ? localStorage.getItem("active-sidebar-category")
          : this.CATEGORIES.DASHBOARD,
    });
  }

  changeLocation(activeMainCategory) {
    localStorage.setItem("active-sidebar-category", activeMainCategory);
  }

  onClickMainCategory(selectedCategory) {
    localStorage.setItem("active-sidebar-category", selectedCategory);

    this.setState({
      ...this.state,
      activeMainCategory: selectedCategory,
      showContent: true,
    });
  }

  showSideMenu() {
    this.setState({
      ...this.state,
      showContent: true,
    });
  }

  hideSideMenu() {
    this.setState({
      ...this.state,
      showContent: false,
    });
  }

  render() {
    let { activeMainCategory } = this.state;

    return (
      <div
        className={`main-side-bar-container ${activeMainCategory ===
          this.CATEGORIES.DASHBOARD && "main-side-bar-dashboard-container"}`}
      >
        <div className="sidebar">
          <div className="avatar">
            <Icon icon="profile" />
          </div>
          <Link to="/">
            <div
              className={`menu-item ${activeMainCategory ===
                this.CATEGORIES.DASHBOARD && "active"}`}
              onClick={() =>
                this.onClickMainCategory(this.CATEGORIES.DASHBOARD)
              }
            >
              <span>Script Analysis</span>
            </div>
          </Link>
          <Link to="/review">
            <div
              className={`menu-item ${activeMainCategory ===
                this.CATEGORIES.PURCHASES && "active"}`}
              onClick={() =>
                this.onClickMainCategory(this.CATEGORIES.PURCHASES)
              }
            >
              <span>Script Review</span>
            </div>
          </Link>
          <Link to="/whether">
            <div
              className={`menu-item ${activeMainCategory ===
                this.CATEGORIES.INVENTORY && "active"}`}
              onClick={() =>
                this.onClickMainCategory(this.CATEGORIES.INVENTORY)
              }
            >
              <span>Whether Prediction</span>
            </div>
          </Link>
          <Link to="/success-rate">
            <div
              className={`menu-item ${activeMainCategory ===
                this.CATEGORIES.SALES && "active"}`}
              onClick={() => this.onClickMainCategory(this.CATEGORIES.SALES)}
            >
              <span>Success Rate</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
