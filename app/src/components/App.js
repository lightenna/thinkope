import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.scss';
import ViewWrapper from "./ViewWrapper";
import NotFoundPage from "./NotFoundPage";

function App() {
    return (
        <div className="App">
            <h2>Far out in the uncharted backwaters....</h2>
            <Switch>
                <Route path="/@:datasource/:path+" component={ViewWrapper}/>
                <Route path="/:path+" component={ViewWrapper}/>
                <Route path="/" component={ViewWrapper}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default App;
