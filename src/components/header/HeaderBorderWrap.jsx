import { Component } from "react";

class HeaderBorderWrap extends Component{





  render(){




    return(
      <div className="h-border-wrap">
        {this.props.children}
      </div>
    )
  }
}






export default HeaderBorderWrap;