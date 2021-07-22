import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';

const rerenderAppEntireTree = (state) => { 
    ReactDOM.render(
        <MainApp />, document.getElementById('root')
    );
}

rerenderAppEntireTree(store.getState());

store.subscribe( () => rerenderAppEntireTree(store.getState()) );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

