import React from "react";
import Users from "./component/layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./component/layouts/main";
import Login from "./component/layouts/login";
import NavBar from "./component/navBar";
// import NotFound from "./component/layouts/not-found";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
                {/* <Route pach="/404" component={NotFound} /> */}
            </Switch>
        </div>
    );
}

export default App;
