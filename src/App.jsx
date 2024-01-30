import { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import HeaderBlock from './components/HeaderBlock';
import HeaderBlockDM from './components/HeaderBlockDM';
import Tables from './components/Tables';
import ffetch from './fetch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      money: 0,
      moneyObj: {},
      moneyDMObj: {},
    };
  }

  componentDidMount() {
    // setTimeout(() => {

    // }, 1000);
    this.getUser();
  }

  async getUser() {
    let url = window.zv.apiLink + 'local/career/get';
    let data = {
      user_id: window.zv.user_id,
    };

    let res = await ffetch(url, data);

    // console.log(res.data);
    if (res.ok) {
      this.setState({
        user_data: res.data,
        done: true,
      });
    }
  }

  money(result) {
    // console.log(result);
    let _t = this.state.moneyObj;
    _t[result.name] = result.count;
    this.setState({
      moneyObj: _t,
    });
  }

  moneyDM(result) {
    // console.log(result);
    let _t = this.state.moneyDMObj;
    _t[result.name] = result.count;
    this.setState({
      moneyDMObj: _t,
    });
  }

  render() {
    let moneyCount = 0;
    for (const _key in this.state.moneyObj) {
      if (Object.hasOwnProperty.call(this.state.moneyObj, _key)) {
        const element = this.state.moneyObj[_key];
        moneyCount += element;
      }
    }
    let moneyDMCount = 0;
    for (const _key in this.state.moneyDMObj) {
      if (Object.hasOwnProperty.call(this.state.moneyDMObj, _key)) {
        const element = this.state.moneyDMObj[_key];
        moneyDMCount += element;
      }
    }

    return (
      <HashRouter>
        <div className='app-wrap'>
          {/*Отключаем роутинг на страницу DM*/}
          
          {/* <Route exact path="/dm">
            {this.state.done &&
              this.state.user_data &&
              this.state.user_data.is_dm && (
                <HeaderBlockDM
                  level_name={this.state.user_data.level_name}
                  sell_result={this.state.user_data.dm_data.indicators}
                  is_dm={this.state.user_data.is_dm}
                  day_data={this.state.user_data.dm_data.indicators}
                  money={moneyDMCount}
                />
              )}
            {this.state.user_data &&
              this.state.user_data &&
              this.state.user_data.is_dm && (
                <Tables
                  is_dm={this.state.user_data.is_dm}
                  dm_cat={this.state.user_data.dm_data.category}
                  money={this.moneyDM.bind(this)}
                  rules={this.state.user_data.dm_data.merged}
                />
              )}
          </Route> */}
          <Route exact path='/'>
            {this.state.done && (
              <HeaderBlock
                level_name={this.state.user_data.level_name}
                sell_result={this.state.user_data.indicators.sell_result}
                is_dm={this.state.user_data.is_dm}
                day_data={this.state.user_data.indicators.day_data}
                money={moneyCount}
              />
            )}

            {!this.state.done && <div style={{ minHeight: '300px' }} className='header-block-wrap-animation'></div>}
            {this.state.user_data && (
              <Tables is_dm={false} money={this.money.bind(this)} rules={this.state.user_data.rules.merged} />
            )}
          </Route>
        </div>
      </HashRouter>
    );
  }
}

export default App;
