import { Fragment } from "react";
import { useSelector } from "react-redux"; //store에서 state를 가지고 와서 로그인이 됬으면 UserProfile을 가져와야 하므로
import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

function App() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated); //configureStore가 새롭게 만든 state인 auth를 가지고 오고 그 auth객체에 포함된 isAuthenticated를 가지고 온다는 것을 의미

    return (
        <Fragment>
            <Header />
            {isAuth ? <UserProfile /> : <Auth />}
            <Counter />
        </Fragment>
    );
}

export default App;
