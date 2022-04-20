import React from "react";

import TodoItem from "./TodoItems";
import Todo from "../models/todo";
//props:{} --> 여기에서 {}에는 값이 아니라 타입 정의가 들어감
//{} --> 타입 정의가 객체로 되는 것을 알 수 있음
//리액트에서 props는 언제나 객체 형태이다.
//그리고 {}안에 들어올 데이터들을 다시 정의해줄 수 있다 --> 데이터들을 키와 값의 형태로 정의함
//ex. {items: string[]} --> props는 객체이고 items를 키로 가지고 문자열 배열을 값으로 가짐
//항상 키-값의 쌍으로 데이터를 가지는 것은 아니다 children이라는 props도 가지고 있다 -> 이 프로퍼티는 타입이 정해져있지 않음
//즉, props를 사용하도록 정의한 모든 컴포넌트에 대해서 객체에 미리 정의된 props를 넣는 다는 것은 매우 귀찮음
//그래서 이것의 대안으로 사용되는 것이 generics이다 -> 함수형 컴포넌트를 바로 제네릭 함수로 변경해서 이용하는 것
const Todos: React.FC<{ items: Todo[] }> = (props) => {
    //여기에 타입표기를 변경해줘야함 현재 Todos는 문자열이 아니라 객체를 저장하고 있으므로
    //todos에 정의된 클래스가 생성자 역할 뿐만이 아니라 타입의 역할도 하고 있으므로 items: Todo[]이렇게 하면 Todo라는 타입을 받는 다는것을 타입스크립트가 알 수 있음
    return (
        <ul>
            {props.items.map((item) => (
                //원래 여기서  TodoItem컴포넌트에 key를 props로 넘겨주지 않았으므로 사용이 불가능하지만 React.FC의 기능으로 key같은 특별한 프로퍼티를 컴포넌트에 추가해서 사용하는 것이 가능함
                <TodoItem key={item.id} text={item.text}></TodoItem>
            ))}
        </ul>
    );
};

export default Todos;
