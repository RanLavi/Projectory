import React from 'react';
import ReactDOM from 'react-dom';
import App from './routing';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import store from './js/store';
import initialState from "./js/state/state"
export default createBrowserHistory();

// const DisplayContext = React.createContext();

// class DisplayProvider extends React.Component{
//     constructor(props) {
//         super(props);
//       }

//     render(){
//         return(
//             <DisplayContext.Provider value = {this.props.display}>

//                 {this.props.children}

//             </DisplayContext.Provider>
//         );
//     }
// }

// export default DisplayProvider;

// import index from "./js/index"

ReactDOM.render(
    <Provider store={store}>

        {/* <DisplayProvider display={initialState.display}> */}

            <App />
{/* 
        </DisplayProvider>, */}

    </Provider>, 

    
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();







// import React from "react";
// import { render } from "react-dom";
// import { Provider } from "react-redux";
// import store from "./store/index";
// import App from "./components/App.jsx";

// // if you're in create-react-app import the files as:
// // import store from "./js/store/index";
// // import App from "./js/components/App.jsx";

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,

//   // The target element might be either root or app,
//   // depending on your development environment
//   // document.getElementById("app")

//   document.getElementById("root")

