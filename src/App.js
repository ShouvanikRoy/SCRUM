import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Table from './Table';
// import canUseDOM from 'can-use-dom';

// export function getQueryStringParameters(url) {
//     if (canUseDOM) {
//         letquery = null;
//         if (url) {
//             if (url.split('?').length > 1) {
//                 // eslint-disable-next-line prefer-destructuring
//                 query = url.split('?')[1];
//             }
//         } else {
//             // eslint-disable-next-line no-param-reassign
//             url = window.location.href;
//             query = window.location.search.substring(1);
//         }
//         returnquery && (/^[?#]/.test(query) ? query.slice(1) : query)
//             .split('&')
//             .reduce((params, param) => {
//                 const [key, value] = param.split('=');
//                 params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
//                 returnparams;
//             }, {});
//     }
// }


function App() {


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/display/:empcode/:plnt" exact component={Table} />
            </Switch>
        </BrowserRouter>
    )

}

export default App;