import { Component } from "react";
import Table from "./tables/Table";
import TableDM from "./tables/TableDM";

class Tables extends Component {








  createTables(item, index, rules){
    return <Table money={this.props.money} key={index} item={item}/>
  }

  createTablesDM(item, index, rules){
    return <TableDM cat={this.props.dm_cat} money={this.props.money} key={index} item={item}/>
  }


  




  render() {

    let tables = this.props.is_dm ? this.props.rules.map(this.createTablesDM.bind(this)) :  this.props.rules.map(this.createTables.bind(this));






    return (
      <div className="tables-block-wrap">
        {tables}
      </div>
    )
  }
}



export default Tables;