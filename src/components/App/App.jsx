import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import SinglePost from "../../pages/SinglePost/SinglePost";
import Profile from "../../pages/Profile/Profile";
import UsersList from "../../pages/UsersList/UsersList";
import PrivateRoute from "../../utils/PrivateRoute";
import { logout } from "../../actions/auth";
import "./app.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <header>
        <div className="nav-links">
          <Link to="/">
            <div className="nav-link">Home</div>
          </Link>
          <Link to="/profile">
            <div className="nav-link">Profile</div>
          </Link>
          <Link to="/users-list">
            <div className="nav-link">Users</div>
          </Link>
        </div>
        <div className="auth-links">
          {isLoggedIn ? (
            <a href="/login" onClick={logOut} className="auth-link">
              Logout
            </a>
          ) : (
            <Link to="/login">
              <div className="auth-link">Login</div>
            </Link>
          )}

          <Link to="/register">
            <div className="auth-link">Register</div>
          </Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/posts/:post_id" component={SinglePost} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/users-list" component={UsersList} />
      </Switch>
    </Router>
  );
}

export default App;
