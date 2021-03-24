import React from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";
import { index } from "../routes/";

function App() {
    return (
        <div className="thinkhope-app">
            <h2>Far out in the uncharted backwaters....</h2>
            <Switch>
                {index.map((route, i) => (
                    <Route {...route} key={i} />
                ))}
            </Switch>
        </div>
    );
}

export default App;
