import * as T from "../constants/action-types";
export function switchDisplay(payload) {
  return { type: T.SWITCH_DISPLAY, payload };
}
export function activeUser(payload) {
  return { type: T.ACTIVE_USER, payload};
}


// activePopup({display: true, onStay: backToProjects, onLogout: backToSignIn })
// const david = () => {}




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
