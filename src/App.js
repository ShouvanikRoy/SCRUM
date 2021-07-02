import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Table from './Table';

function App() {


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/display/:empcode" exact component={Table} />
            </Switch>
        </BrowserRouter>
    )

}

export default App;