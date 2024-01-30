import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import StatusCircle from "./elems/StatusCircle";
import Category from "./header/Category";
import HeaderBorderWrap from "./header/HeaderBorderWrap";
import HeaderLilWrap from "./header/HeaderLilWrap";

class HeaderBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationStyles: {
        opacity: "0",
        transition: ".3s",
        // transform: "translateX(-10%)"
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationStyles: {
          opacity: "1",
          transition: ".3s",
          // transform: "translateX(0)"
        },
      });
    }, Math.random() * (800 - 150) + 150);
  }

  getColors(value) {
    if (value >= 10 && value <= 28) {
      return ["#dc3545", "#9e2430"];
    } else if (value >= 29 && value <= 51) {
      return ["#ca371f", "#9e2430"];
    } else if (value >= 52 && value <= 75) {
      return ["#dc5c35", "#ad3b28"];
    } else if (value >= 76 && value <= 89) {
      return ["#dc7235", "#b15621"];
    } else if (value >= 90 && value <= 100) {
      return ["#2f743e", "#11461e"];
    } else if (value > 100) {
      return ["#2f743e", "#11461e"];
    }

    return ["#dc3545", "#9e2430"];
  }

  createCircle(item, index) {
    let _value = this.getColors(item.value || 0);
    return (
      <div key={index} className="circle-wrap col">
        <p className="m-0 text-secondary text-center">
          {item.name.toLowerCase()}
        </p>
        <StatusCircle
          bg="transparent"
          inner={(item.value || 0) + "%"}
          id={"circle_val_" + index + "_" + item.value}
          size="140"
          startColor={_value[0]}
          endColor={_value[1]}
          secondaryColor="#e0d8d6"
          status={parseInt(item.value) > 100 ? 100 : item.value || 0}
          strokeWidth="20"
        />
      </div>
    );
  }

  createPillows(item, index) {
    return (
      <React.Fragment key={index}>
        <p className="m-0 ml-2 text-secondary">
          {item.name.toLowerCase() + ":"}
        </p>
        <HeaderLilWrap>
          <h5>{item.value || "---"}</h5>
        </HeaderLilWrap>
      </React.Fragment>
    );
  }

  render() {
    // let sht = this.getColors(78);
    // let rozs = this.getColors(95);
    let level =
      this.props.level_name != undefined ? this.props.level_name : "---";
    let circles =
      this.props.sell_result != undefined
        ? this.props.sell_result.map(this.createCircle.bind(this))
        : "";
    let pillows =
      this.props.day_data != undefined
        ? this.props.day_data.map(this.createPillows.bind(this))
        : "";

    let toDM = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-caret-right-fill"
        viewBox="0 0 16 16"
        style={{
          height: "1.2em",
          width: "1.2em"
        }}
      >
        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
      </svg>
    );

    return (
      <div style={this.state.animationStyles} className="header-block-wrap">
        <div className="container-fluid d-flex">
          <div className="row no-gutters flex-grow-1 justify-content-start">
            <div className="col-3">
              <div className="row no-gutters">
                <p className="m-0 ml-2 text-secondary">категорiя:</p>
                <HeaderLilWrap>
                  <Category level={level} />
                </HeaderLilWrap>
                {pillows}
              </div>
            </div>
            <div className="col-9 circles">
              <div className="ml-3">
                <p className="m-0 ml-2 text-secondary">вiдсоток вiд кращого:</p>
                <div className="p-1">
                  <HeaderBorderWrap>
                    <div className="d-flex">
                      <div className="row">{circles}</div>
                    </div>
                  </HeaderBorderWrap>
                </div>
              </div>
              <div className="w-100"></div>
              {!this.props.is_dm && (
                <span className="money">
                  <h5>
                    <span className="text-secondary">приблизно:&nbsp;</span>
                    <strong>
                      {this.props.money} <span className="z-red">ZV</span>
                    </strong>
                  </h5>
                </span>
              )}
              {/*Отключаем роутинг на страницу DM*/}
              
              {/* {this.props.is_dm && (
                <NavLink to="/dm">
                  <div className="money careere-dm"><div className="d-flex">
                      <h5 className="mb-1">Кар'єра ДМ</h5>
                      <span className="d-flex align-items-center">{toDM}</span>
                    </div></div>
                </NavLink>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderBlock;
