import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider, connect } from "react-redux";
import rootReducer from "./reducers/index";
import { setUser, clearUser } from "./actions/index";
import Spinner from "./components/Common/Spinner";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  isLoading: user.isLoading,
});

const RootWithAuth = withRouter(
  connect(mapStateToProps, { setUser, clearUser })(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
