//루트 컴포넌트를 설정하는 파일, 스토어를 전역에 적용하기 위해서는 루트 컴포넌트에 포함되어야 함
//Provider을 가지고 오고 React-redux에서 프로바이더 컴포넌트를 가져와서 그 앞뒤에 app을 입력
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/index";
import "./index.css";
import App from "./App";

ReactDOM.render(
    // 전체 애플리케이션에 리덕스 스토어를 제공하는 방법 -> 애플리케이션을 구성하는 모든 컴포넌트에 적용함
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
