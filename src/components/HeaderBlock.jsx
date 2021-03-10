import React, { Component } from "react";
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
      }
    }
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationStyles: {
          opacity: "1",
          transition: ".3s",
          // transform: "translateX(0)"
        }
      })
    }, Math.random() * (800 - 150) + 150);
  }


  getColors(value) {
    if (value >= 10 && value <= 28) {
      return [
        "#dc3545",
        "#9e2430"
      ]
    } else if (value >= 29 && value <= 51) {
      return [
        "#ca371f",
        "#9e2430"
      ]
    } else if (value >= 52 && value <= 75) {
      return [
        "#dc5c35",
        "#ad3b28"
      ]
    } else if (value >= 76 && value <= 89) {
      return [
        "#dc7235",
        "#b15621"
      ]
    } else if (value >= 90 && value <= 100) {
      return [
        "#2f743e",
        "#11461e"
      ]
    }

    return [
      "#dc3545",
      "#9e2430"
    ]
  }

  createCircle(item, index) {
    let _value = this.getColors(item.value || 0)
    return <div key={index} className="circle-wrap col">
      <p className="m-0 text-secondary text-center">{item.name.toLowerCase()}</p>
      <StatusCircle bg="transparent" inner={(item.value || 0) + "%"} id={"circle_val_" + index} size="140" startColor={_value[0]} endColor={_value[1]} secondaryColor="#e0d8d6" status={item.value || 0} strokeWidth="20" />
    </div>
  }



  createPillows(item, index) {
    return <React.Fragment key={index}>
      <p className="m-0 ml-2 text-secondary">{item.name.toLowerCase() + ":"}</p>
      <HeaderLilWrap>
        <h5>{item.value || "---"}</h5>
      </HeaderLilWrap>
    </React.Fragment>
  }






  render() {

    // let sht = this.getColors(78);
    // let rozs = this.getColors(95);
    let level = this.props.data != undefined ? this.props.data.level_name : "---";
    let circles = this.props.data != undefined ? this.props.data.indicators.sell_result.map(this.createCircle.bind(this)) : "";
    let pillows = this.props.data != undefined ? this.props.data.indicators.day_data.map(this.createPillows.bind(this)) : "";




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
                      <div className="row">
                        {circles}
                      </div>
                    </div>
                  </HeaderBorderWrap>
                </div>
              </div>
              <div className="w-100"></div>
              <span className="money">
                <h5>
                  <span className="text-secondary">
                    приблизно:&nbsp;
                  </span>
                  <strong>
                    {this.props.money} <span className="z-red">ZV</span>
                  </strong>
                </h5>
              </span>
            </div>

          </div>
        </div>
      </div>
    )
  }
}




export default HeaderBlock;