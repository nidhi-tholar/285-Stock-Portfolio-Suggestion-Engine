import React from 'react'
import axios from 'axios'
import loading from '../Gear-0.2s-200px.gif'
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import "../UserProfile/UserProfileStyle.css";
import Dashboard from "../Dashboard/Dashboard";
toast.configure();


export default class UserProfile extends React.Component {

  state = {
    amount: '',
    strategyOne: '',
    strategyTwo: '',
    strategies: ['Ethical Investing', 'Growth Investing', 'Index Investing', 'Quality Investing', 'Value Investing'],
    availableSecondStrategies: [],
    result: [],
    loading: false
  }

  componentDidMount = () => {
    localStorage.clear()
  }

  onAmountChange = (e) => {
    e.preventDefault()
    e.persist()
    this.setState(() => ({ amount: e.target.value }))
  }

  onStrategyOneChange = (e) => {
    e.preventDefault()
    e.persist()
    this.state.result = [];
    const availableSecondStrategies = this.state.strategies.filter((strategy) => strategy !== e.target.value)
    this.setState(() => ({ strategyOne: e.target.value, availableSecondStrategies, strategyTwo: 'DEFAULT' }))
  }

  onStrategyTwoChange = (e) => {
    e.preventDefault()
    e.persist()
    this.state.result = [];
    this.setState(() => ({ strategyTwo: e.target.value }))
  }

  handleOnSubmit = async (e) => {
    e.preventDefault()
    if (this.state.amount === '') return toast('Amount Missing', { type: 'error' })
    if (!this.state.strategyOne) return toast('Strategy 1 missing', { type: 'error' })
    localStorage.clear()
    //Need to get the axios call here
    this.setState(() => ({ loading: true }))

    const result = (await axios.post('http://localhost:5000/calculateprofit', { amount: this.state.amount, strategies: this.state.strategyOne + (this.state.strategyTwo !== 'DEFAULT' ? ',' + this.state.strategyTwo : '') })).data.result
    this.setState(() => ({ result, loading: false }))
    localStorage.setItem('result', JSON.stringify(result))
    // this.props.history.push({
    //   pathname: '/admin/suggestions',
    //   state: 'test'
    // })
  }
  render() {
    return (
      <div>
        
        <Card>
          <CardHeader style={{backgroundColor:"rgba(0,0,0, 0.7)", color:"white"}}>
            <h4 className="cardTitleWhite">Select the below options</h4>
            <span>Amount should be greater or equal to $5000</span>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleOnSubmit}>
              <div className='container'>
                <div style={{ color:'#fff', margin : 1, padding: 2 }}>
                  <input 
                    style={{color: '#fff'}}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Amount to Invest"
                    min={5000}
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                  />
                  </div>
                  <div style={{ color:'#black', margin : 1, padding: 2 }}>
                  <label htmlFor="exampleFormControlSelect1"></label>
                  <select className="form-control" id="exampleFormControlSelect1" onChange={this.onStrategyOneChange} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled style={{color: 'black'}}>Select Strategy 1</option>
                    {
                      this.state.strategies.map((strategy) => <option key={strategy} value={strategy}>{strategy}</option>)
                    }
                  </select>
                </div>
              </div>
              {this.state.strategyOne && <div className="form-group">
                <label htmlFor="exampleFormControlSelect1"></label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={this.onStrategyTwoChange} defaultValue={"DEFAULT"}>
                  <option value="DEFAULT" disabled style={{color: '#fff'}}>Select Strategy 2</option>
                  {
                    this.state.availableSecondStrategies.map((availableStrategy) => <option key={availableStrategy} value={availableStrategy}>{availableStrategy}</option>)
                  }
                </select>
              </div>}

              <div className='form-button-container form-button-style'>
                <Button type="submit" style={{backgroundColor:"rgba(0,0,0, 0.8)", color:"white"}} round>Run suggestion Engine</Button>
              </div>
            </form>
          </CardBody>
        </Card>
        {this.state.loading &&  <div className="loading" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}><img src={loading} alt="alt"></img></div>}
        <div>
        {!this.state.loading && <Dashboard results={this.state.result}/>}
        </div>
          
        
      </div>
    )
  }
}