import { Component } from "react";
import Table from "./tables/Table";

class Tables extends Component {








  createTables(item, index, rules){
    return <Table money={this.props.money} key={index} item={item}/>
  }


  




  render() {

    let tables = this.props.rules.map(this.createTables.bind(this));






    return (
      <div className="tables-block-wrap">
        {tables}
      </div>
    )
  }
}



export default Tables;