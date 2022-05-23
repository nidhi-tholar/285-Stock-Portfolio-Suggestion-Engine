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
  };

  const addToFav  = async(e) =>  {
    //   setFun([...symbols, {"s": value, "d":"Bitch"}])
    //   console.log(symbols)

    e.preventDefault();
    console.log(symbols);
    if (value == '') return toast('Symbol missing', { type: 'error' })

     await axios.get('http://localhost:5000/checkStock/' + value)
        .then(resp => {
            let data = resp.data
            console.log(data);
            setFun(symbols => [...symbols, data]);
            console.log(symbols);
            localStorage.setItem('symbols', JSON.stringify(symbols))
            setMessage("Added " + resp.data.symbol + " to Favorites");
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
            setMessage("Invalid Symbol")
        });
  }
    
    return (
        <div>
            <form>
            <label>
                Stock symbol:
                <input type="text" name="name"  placeholder='Enter a symbol' onChange={handleChange}/>
            </label>
            <input type="submit" value="Add to Favorites" onClick={addToFav}/>
            <div>{message}</div>
            </form>

        </div>
      );
    };

    export default AddFavorite;
    