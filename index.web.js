// import {AppRegistry} from 'react-native';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import {name as appName} from './app.json';
import App from './App';
// if (module.hot) {
//   module.hot.accept();
// }

const root = ReactDOM.createRoot(
  document.getElementById('react-native-web-app'),
);
root.render(<App />);

// below code will generate 'ReactDOM.render is no longer supported in React 18.' warning message s
// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.runApplication(appName, {
//   initialProps: {},
//   rootTag: document.getElementById('react-native-web-app'),
// });
