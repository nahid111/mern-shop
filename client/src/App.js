import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.min.css";
import "./App.css";
// Components
import Navbar from "./components/navigation/Navbar.jsx";
import Sidebar from "./components/navigation/Sidebar.jsx";
import Banner from "./components/Banner.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
// import Products from "./components/Products.jsx";
import Routes from "./components/routing/Routes";
// Utils
import setAuthToken from "./utils/setAuthToken";
// Actions
import { loadUser } from "./store/actions/auth";
// Redux
import store from "./store/";
import { Provider } from "react-redux";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Banner />

          {/* ============================================= */}
          {/*                  Main Container               */}
          {/* ============================================= */}
          <div className="container">
            <div className="section">
              <div className="columns">
                {/* ============================================= */}
                {/*                     SideNav                   */}
                {/* ============================================= */}
                <div className="column is-2">
                  <Sidebar />
                </div>
                {/* SideNav End */}

                {/* ============================================= */}
                {/*                 Center Content                */}
                {/* ============================================= */}
                <div className="column is-10">
                  {/* <Products /> */}
                  <Switch>
                    <Route component={Routes} />
                  </Switch>
                </div>
                {/* Center Content End */}
              </div>
            </div>
          </div>
          {/* Main Container End */}

          <Footer />
          <Cart/>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
