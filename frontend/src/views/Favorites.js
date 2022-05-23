import React from 'react';
import AddFavorite from './addFavorite';
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

 const Favorites = ({symbol}) => {

    const classes = useStyles();

   
        return (
            <div>
                <Card>
                <CardBody>
                <h3 className={classes.cardTitle}>{symbol.symbol}</h3>
                <h4 className={classes.cardTitle}>{symbol.longName}</h4>
                <h4 className={classes.cardTitle}>{symbol.price}</h4>
                </CardBody>
                </Card>
            </div>
        )
    }

    export default Favorites;