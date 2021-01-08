import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.scss';
import { index } from "../routes/";

function App() {
    return (
        <div className="App">
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
