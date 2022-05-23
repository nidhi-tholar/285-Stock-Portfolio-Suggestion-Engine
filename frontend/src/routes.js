/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Typography from "views/Typography/Typography.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import OurPortfolio from './views/OurPortfolio';
import MainFav from "./views/MainFav";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/ourportfolio",
    name: "Portfolio",
    component: OurPortfolio,
    layout: "/admin"
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: MainFav,
    layout: "/admin"
  }
];

export default dashboardRoutes;
