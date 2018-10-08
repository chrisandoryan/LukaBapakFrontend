import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/fontawesome/css/all.min.css';
import registerServiceWorker from './registerServiceWorker';
import {ThroughProvider} from 'react-through'


ReactDOM.render(
<ThroughProvider><App /></ThroughProvider>, document.getElementById('root'));
registerServiceWorker();
