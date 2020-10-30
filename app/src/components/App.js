import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.scss';
import View from "./View";
import NotFoundPage from "./NotFoundPage";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <h2>Far out in the uncharted backwaters....</h2>
                <Switch>
                    <Route path="/@:datasource/:path+" component={View} />
                    <Route path="/:path+" component={View} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }

}

export default App;
