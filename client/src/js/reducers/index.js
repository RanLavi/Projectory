import * as T from "../constants/action-types";
import initialState from "../state/state";

function rootReducer(state = initialState, action) {
    switch(action.type){
        case T.SWITCH_DISPLAY: 
            return { ...state, display: action.payload };
        case T.ACTIVE_POPUP:
            return {...state, popup: action.payload};
        default:
            return state;
    }
}
export default rootReducer;




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
