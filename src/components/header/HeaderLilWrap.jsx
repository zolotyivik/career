import { Component } from "react";

class HeaderLilWrap extends Component {
  constructor(props){
    super(props);

    this.state = {
      animationStyles : {
        opacity : "0",
        transition: ".3s",
        transform : "translateX(-10%)"
      }
    }
  }


  componentDidMount(){
    setTimeout(() => {
      this.setState({
        animationStyles: {
          opacity: "1",
          transition: ".3s",
          transform: "translateX(0)"
        }
      })
    }, Math.random() * (800 - 150) + 150);
  }




  render() {





    return (
      <div style={this.state.animationStyles} className="h-lil-wrap white-bg w-100 brr-6 m--6 p--13">
        
        {this.props.children}
      </div>
    )
  }
}




export default HeaderLilWrap;