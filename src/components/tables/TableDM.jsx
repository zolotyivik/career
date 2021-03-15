import React, { Component } from "react";
import ffetch from "../../fetch";


class T extends Component {
  constructor(props) {

    super(props);
    this._table = React.createRef();
    this._height = 0;


    this.state = {
      open: true,
      tableStyles: {},
      
    }

  }

  componentDidMount() {
    // console.log(this._table.current);
    this._height = this._table.current.offsetHeight;
    this.setState({
      open: false,
      tableStyles: {
        overflow: "hidden",
        height: 0,
        display: "block"
      }
    })
    
  }


  componentDidUpdate(prev) {

    if (prev.open !== this.props.open) {
      let _state = this.props.open ? {
        overflow: "hidden",
        height: this._height,
        display: "block"
      } : {
          overflow: "hidden",
          height: 0,
          display: "block"
        }

      this.setState({
        open: this.props.open,
        tableStyles: _state
      })
    }


  }




  render() {
    // console.log(this._height);



    return (
      <table
        style={this.state.tableStyles}
        ref={this._table}
        className="table table-hover table-striped careere-table"
      >
        <thead>
          <tr>{this.props.h}</tr>
        </thead>
        <tbody>{this.props.r}</tbody>
      </table>
    )
  }
}



class Table extends Component {
  constructor(props) {

    super(props);


    this.state = {
      data: null,
      loaded: false,
      animationStyles: {
        opacity: "0",
        transition: ".3s",
        transform: "translateX(-5%)"
      }
    }

    this.getTable = this.getTable.bind(this);
  }


  componentDidMount() {
    this.getTable();
  }



  async getTable() {
    let url = window.zv.apiLink + "local/career/getTableDM";
    let data = {
      user_id: window.zv.user_id,
      value: this.props.item.value,
      cat: this.props.cat
    }

    let res = await ffetch(url, data);

    if (res.ok) {
      // console.log(res.data);
      this.setState({
        data: res.data,
        loaded: true
      })
      this.props.money({ name: this.props.item.value, count: res.data.money});
      setTimeout(() => {
        this.setState({
          animationStyles: {
            opacity: "1",
            transition: ".3s",
            transform: "translateX(0)"
          }
        })
      }, Math.random() * (800 - 150) + 150);
    } else {
      console.error(res);
    }
  }



  createHeaders(item, index) {
    return <th key={index}>{item}</th>;
  }




  createRows(item, index) {
    let _row = [];
    let _class = item.me ? "me" : "";

    if(item.me){
      // this.props.me(item.v[item.v.length - 1])
      // console.log(item.v[item.v.length - 1]);
      // window.zv.me += parseInt(item.v[item.v.length - 1]);
    }


    for (let for_index = 0; for_index < item.v.length; for_index++) {
      const element = item.v[for_index];
      let _td = for_index == 0 ?
        <th key={"th_" + for_index} scope="row">
          {element}
        </th> :
        <td key={"td_" + for_index}>{element}</td>

      _row.push(_td);
    }
    return (
      <tr className={_class} key={index}>
        {_row}
      </tr>
    );
  }


  openClosed() {
    this.setState({
      open: !this.state.open
    })
  }






  render() {
    let headers = this.state.data && this.state.data.headers.map(this.createHeaders)
    let rows = this.state.data != null && this.state.data.data.map(this.createRows.bind(this))
    // console.log(headers);
    // console.log(this.state);

    let icon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
      <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>



    return (
      <div className="table-wrap">
        {this.state.loaded &&
          <div style={this.state.animationStyles} className={"wrap-inner" + (this.state.open ? " opened " : " closed ")}>
            <div className={"opener-title " + (this.state.open ? " opened " : " closed ")} onClick={this.openClosed.bind(this)}>
            <h5 className="d-flex align-items-center justify-content-between"><strong>
              {this.props.item.name}</strong> {icon}</h5>
            </div>
            <T open={this.state.open} h={headers} r={rows} />
          </div>
        }
      </div>
    )
  }
}



export default Table;