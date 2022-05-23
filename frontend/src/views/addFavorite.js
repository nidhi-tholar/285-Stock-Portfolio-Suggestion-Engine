import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

 const AddFavorite = ({symbols, setFun}) => {

    // const symbolOptions = [{symbol:"MSFT",name:"MICROSOFT CORP."},{symbol:"FB",name:"META PLATFORMS, INC."},{symbol:"QCOM",name:"QUALCOMM INCORPORATED"},{symbol:"TXN",name:"TEXAS INSTRUMENTS INCORPORATED"},
    // {symbol:"PYPL",name:""},{symbol:"ADI",name:""},{symbol:"NFLX",name:""},{symbol:"WBD",name:""},{symbol:"ADSK",name:""},
    // {symbol:"RIVN",name:""}]

    const [value, setValue] = React.useState('MSFT');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const addToFav = (e) => {
    //   setFun([...symbols, {"s": value, "d":"Bitch"}])
    //   console.log(symbols)

    e.preventDefault()
    if (value == '') return toast('Symbol missing', { type: 'error' })


    const result =  axios.get('http://localhost:5000/checkStock/', { params: { stock: value }});
    console.log(result);
  }
    
    return (
        // <div>
        //   <label>
        //     Select a symbol
        //     <select value={value} onChange={handleChange}>
        //       {symbolOptions.map((symbol) => (
        //         <option value={symbol.symbol}>{symbol.symbol} - {symbol.name}</option>
        //       ))}
        //     </select>
        //   </label>
        // <br/>
        //   <button onClick={onSubmit}>Add to Favorites</button>
        // </div>

        <div>
            <form>
            <label>
                Stock symbol:
                <input type="text" name="name"  placeholder='Enter a symbol'/>
            </label>
            <input type="submit" value="Add to Favorites" onClick={addToFav}/>
            </form>

        </div>
      );
    };

    export default AddFavorite;
    