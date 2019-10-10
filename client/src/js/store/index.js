import { createStore } from "redux";
import rootReducer from "../reducers/index";
const store = createStore(rootReducer);
export default store;




// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './routing';
// import * as serviceWorker from './serviceWorker';
// import { createBrowserHistory } from "history";
// export default createBrowserHistory()

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
