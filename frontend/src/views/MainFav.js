import Favorites from "./Favorites";
import AddFavorite from "./addFavorite";
import * as React from 'react';

 const MainFav = () => {

    const [symbols, setSymbols] = React.useState([]);

    return (
        <div>
          <AddFavorite setFun={setSymbols} symbols={symbols}/>
          <Favorites symbols={symbols}/>
        </div>
      );
    };

    export default MainFav;
    