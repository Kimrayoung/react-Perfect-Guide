//이 파일에서 전체 앱을 렌더링함
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //Provider은 실제 컴포넌트에 해당함
import store from "../store/index";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

//Provider 컴포넌트로 감싸진 컴폰넌트만이 store에 접근할 수 있음
//즉, 모든 컴포넌트에서 store에 접근해야 한다면 가장 높은 레벨인 root레벨 컴포넌트인 App컴포넌트를 감싸줘야 한다.hh
//또한 store는 비록 하나지만 react에게 어떤 store을 제공할 건지 알려줘야 한다!!! ->  필수
//왜냐하면 react는 store가 하나인지 알지 못하기 때문임

//마지막으로 store을 react-redux가 사용할 수 있도록 연결시켜줘야 함 -> Provider컴포넌트에 props으로 넘겨줘야한다.
//store이라는 이름의 props에 store저장소를 연결

//react-redux가 App컴포넌트를 감쌌기 때문에 App컴포넌트의 child component에서 store에 접근해서 데이터를 가져올 수 있다
//또한 action을 보내 reducer로 하여금 데이터의 state를 변경시킬 수 있다
