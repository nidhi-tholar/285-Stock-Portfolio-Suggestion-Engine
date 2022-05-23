import Favorites from "./Favorites";
import AddFavorite from "./addFavorite";
import * as React from 'react';
import axios from 'axios';

 const MainFav = () => {

    // const [items, setItems] = React.useState([]);
    const [symbols, setSymbols] = React.useState([]);

    React.useEffect(() => {
    }, [symbols]);

    React.useEffect(() => {
        const items = JSON.parse(localStorage.getItem('symbols'));
        if (items) {
            setSymbols(items);
        }
    }, []);


    return (
        <div>
          <AddFavorite setFun={setSymbols} symbols={symbols}/>
          {symbols.map(symbol => <Favorites key={symbol.symbol} symbol={symbol}/>)}
        </div>
      );
    };

    export default MainFav;
    