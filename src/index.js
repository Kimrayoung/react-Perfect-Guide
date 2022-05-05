import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //Provider은 실제 컴포넌트에 해당함
import store from "./store/index";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
