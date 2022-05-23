import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

 const AddFavorite = ({symbols, setFun}) => {

    // const symbolOptions = [{symbol:"MSFT",name:"MICROSOFT CORP."},{symbol:"FB",name:"META PLATFORMS, INC."},{symbol:"QCOM",name:"QUALCOMM INCORPORATED"},{symbol:"TXN",name:"TEXAS INSTRUMENTS INCORPORATED"},
    // {symbol:"PYPL",name:""},{symbol:"ADI",name:""},{symbol:"NFLX",name:""},{symbol:"WBD",name:""},{symbol:"ADSK",name:""},
    // {symbol:"RIVN",name:""}]

    const [value, setValue] = React.useState('');
    const [message, setMessage] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setMessage('');
  };

  const addToFav  = async(e) =>  {
    e.preventDefault();
    setMessage('');
    if (value == '') return toast('Symbol missing', { type: 'error' })

     await axios.get('http://localhost:5000/checkStock/' + value)
        .then(resp => {
            let data = resp.data
            setFun(symbols => [...symbols, data]);
            localStorage.setItem('symbols', JSON.stringify([...symbols, data]))
            setMessage("Added " + resp.data.symbol + " to Favorites");
        })
        .catch(err => {
            // Handle Error Here
            setMessage("Invalid Symbol")
        });
  }
    
    return (
        <div>
            <form>
            <label>
                Stock symbol:
                <input type="text" name="name"  placeholder='Enter a symbol' onChange={handleChange}/>
            </label> &nbsp;
            <button style={{backgroundColor:"rgba(0,0,0, 0.8)", color:"white"}} onClick={(e) => {addToFav(e);}}>Add to Favorites</button>
            <div>{message}</div>
            </form>

        </div>
      );
    };

    export default AddFavorite;
    