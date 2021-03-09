import React, { Component } from "react";


class StatusCircle extends Component {

  constructor(props) {
    super(props);
    this._circle = React.createRef();
    this.radius = (this.props.size / 2) - (this.props.strokeWidth );
    this.strokeDasharray = this.radius * 2 * Math.PI;

    this.state = {
      status: 0,
      secStatus: 0,
      color: "transparent",
      textStyle: {
        margin: 0,
        opacity: 0,
        transition: ".2s"
      }
    }


    this.getStatus = this.getStatus.bind(this);
  }



  getStatus() {
    let status = (this.strokeDasharray / 100) * (100 - this.props.status);
    let secStatus = this.strokeDasharray - status
    setTimeout(() => {
      this.setState({
        status: status,
        secStatus: this.strokeDasharray - status,
        // color: this.props.color,
        color: "url(#" + this.props.id + "_gradient)",
        textStyle: {
          margin: 0,
          opacity: 1,
          transition: ".2s",
          fontSize: this.props.size/6 + "px"
        }
      })
    }, 500);
  }


  componentDidMount() {
    this.getStatus();
  }

  componentDidUpdate(prev) {
    if (prev.status !== this.props.status) {
      this.getStatus();
    }
  }



  render() {
    // let radius = (this.props.size / 2) - (this.props.strokeWidth * 2);
    // let strokeDasharray = radius * 2 * Math.PI;
    // let status = (strokeDasharray / 100) * (100 - this.props.status);
    // let secStatus = strokeDasharray - status 


    // console.log(this.props.status);
    return (
      <span className="svg-wrap"
        style={
          {
            height: this.props.size + "px",
            width: this.props.size + "px",
            position: 'relative',
            display:"block"
          }
        }
        
      >
        <span className="text-wrap" style={{
          position: 'absolute',
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}>
          <p style={this.state.textStyle}><strong>{this.props.inner}</strong></p>
        </span>
        <svg
          className="progress-ring"
          style={{
            background: this.props.bg
          }}
          height={this.props.size + "px"}
          width={this.props.size + "px"}
        >
          <circle
            ref={this._circle}
            className="progress-ring__circle"
            style={{
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              strokeDasharray: this.strokeDasharray + " " + this.strokeDasharray,
              strokeDashoffset: this.state.status
            }}
            stroke={this.state.color}
            strokeWidth={this.props.strokeWidth}
            fill="transparent"
            r={this.radius}
            cx={this.props.size / 2}
            cy={this.props.size / 2}
          />
          <linearGradient id={this.props.id + "_gradient"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={this.props.startColor} />
            <stop offset="100%" stopColor={this.props.endColor} />
          </linearGradient>
          <circle
            ref={this._circle}
            className="progress-ring__circle"
            style={{
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              strokeDasharray: this.strokeDasharray + " " + this.strokeDasharray,
              strokeDashoffset: -this.state.secStatus
            }}
            stroke={this.props.secondaryColor}
            strokeWidth={this.props.strokeWidth}
            fill="transparent"
            r={this.radius}
            cx={this.props.size / 2}
            cy={this.props.size / 2}
          />
        </svg>
      </span>
    )
  }
}





export default StatusCircle;