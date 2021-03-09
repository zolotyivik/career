import { Component } from "react";

class Category extends Component{






  render(){

    let cat = this.props.level;




    return(
      <h5>{cat}</h5>
    )
  }
}



export default Category;