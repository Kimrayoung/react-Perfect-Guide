import { useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import Todos from "./components/Todos";
import Todo from "./models/todo";
//Todo클래스를 사용해서 객체를 만들 수 잇음

function App() {
    //정의된 클래스가 호출되었을 때 생성자 역할 만하는 것이 아니라 타입 역할도 한다는 것 -> class 이름은 타입으로도 사용할 수 있음

    //TodoInput이 추가될때 배열이 변경되니까 화면에서 리렌더링이 일어날 것
    //즉, 리렌더링 되는 값을 TodoInput에서 받아서 처리가 되어야 함
    //그리고 App이 변경된 배열을 받아서 Todos에 넘겨줘서 화면을 렌더링 시켜줘야 함
    // const todos = [
    //     new Todo("Learn React"), //todos는 문자열 배열이 아니라 객체 배열에 해당함(왜냐하면 Todo클래스가 객체로 이루어져 있기 때문)
    //     new Todo("Learn Typescript"),
    // ];

    //setTodo는 React.Dispatch라는 타입을 가진다. 이 타입은 상태 업데이트 함수가 갖는 타입으로 이 함수를 호출해서 state를 변경할 수 있음
    //useState([]) --> 이렇게 해준다면 todos는 never[]이 된다 --> 이 배열이 언제나 비어있어야 한다는 것을 의미 : 어떤 값도 추가될 수 없음
    //useState()는 타입을 정의할 수 있도록 generic으로 정의되어있음 즉, 제네릭 함수
    //useState<>()-->state를 통해 관리할 데이터의 타입은 Todo로 구성된 배열
    //배열에 추가될 데이터는 반드시 Todo타입이어야 한다.
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        //새로운 Todo를 만들어서 생성자에게 인자로 받아온 todoText를 전달함
        const newTodo = new Todo(todoText);

        //state를 업데이트 하려면 함수 형태를 이용해서 업데이트 해야 함
        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        });
    };

    return (
        <div>
            <TodoInput onAddTodo={addTodoHandler}> </TodoInput>
            {/* Todos의 컴포넌트에 넘어가는 props중 Items라는 이름을 가진 props에 todos를 매핑해주면 됨 */}
            <Todos items={todos} />
        </div>
    );
}

export default App;
