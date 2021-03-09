import { Component } from "react";
import HeaderBlock from "./components/HeaderBlock";
import Tables from "./components/Tables";
import ffetch from "./fetch";

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      done: false,
      money : 0,
      moneyObj : {}
    }
  }


  componentDidMount() {
    // setTimeout(() => {
      
    // }, 1000);
    this.getUser();
  }



  async getUser(){
    let url = window.zv.apiLink + "local/career/get";
    let data = {
      user_id : window.zv.user_id
    }

    let res = await ffetch(url, data);

    console.log(res.data);
    if(res.ok){
      this.setState({
        user_data : res.data,
        done : true
      })
    }

  }




  money(result) {
    console.log(result);
    let _t = this.state.moneyObj; 
    _t[result.name] = result.count;
    this.setState({
      moneyObj : _t
    })
  }




  render(){
    let moneyCount = 0;
    for (const _key in this.state.moneyObj) {
      if (Object.hasOwnProperty.call(this.state.moneyObj, _key)) {
        const element = this.state.moneyObj[_key];
        moneyCount += element;
      }
    }

    



    return (
      <div className="app-wrap">
        {this.state.done && <HeaderBlock money={moneyCount} data={this.state.user_data}/>}
        {!this.state.done && <div style={{minHeight : "300px"}} className="header-block-wrap-animation"></div>}
        {this.state.user_data && <Tables money={this.money.bind(this)} rules={this.state.user_data.rules.merged} />}
      </div>
    )
  }
}




export default App;