import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import moment from 'moment'
import { dailySalesChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const Dashboard = ({results}) => {
  const classes = useStyles();
  var Chartist = require("chartist");
  const [colors, setColors] = useState(['success', 'warning', 'danger', 'primary', 'info'])
  // const [results, setResults] = useState([])
  const [options, setOptions] = useState({
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 3000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  })

  return (
    <div>
      <GridContainer>
        {results && results.length > 0 ? results.map((result, index) => (
          <GridItem key={index} xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color={colors[Math.floor(Math.random() * Math.floor(5))]}>
                <ChartistGraph
                  className="ct-chart"
                  data={{ labels: result.HistoricalDates.map((date) => moment(date).utc().format('MM/DD')), series: [result.HistoricalData] }}
                  type="Line"
                  options={{...options, high: Math.max(result.HistoricalData), low: Math.min(result.HistoricalData)}}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h3 className={classes.cardTitle}>{result.Strategy}</h3>
                <h4 className={classes.cardTitle}>{result.CompantName}</h4>
                <p><strong>Price:</strong> $ {result.CurrentPrice.toFixed(2)}</p>
                <p><strong>Value Change:</strong> {result.ValueChange}</p>
                <p><strong>Percent Change:</strong> {result.PercentageChange}</p>
                <p><strong>No. of stocks you can buy:</strong> {result.UnitsYouCanBuy}</p>
                <p><strong>Amount you can invest:</strong> ${result.AmountYouInvest.toFixed(2)}</p>
              </CardBody>
              {/* <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated a minutes ago
              </div>
              </CardFooter> */}
            </Card>
          </GridItem>
        )) : null}
      </GridContainer>
    </div>
  );
}

export default Dashboard
