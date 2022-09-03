import React from "react";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
// import NotFound from "./component/layouts/not-found";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
                {/* <Route pach="/404" component={NotFound} /> */}
            </Switch>
        </div>
    );
}

export default App;
