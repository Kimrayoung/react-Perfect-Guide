//사용자에게 입력을 제공하고 사용자가 입력한 Todo의 내용을 가져옴

import React, { useRef } from "react";

//사용자 입력을 받는 두가지 방식 --> useState, useRef
//useState --> 키가 눌릴 때마다 이벤트를 수신하는 방법(모든 키의 입력을 받아 확인하면서 진행하는 방식)
//useRef  --> 한번에 입력을 가져오는 방식(폼이 제출될 때만 가져오는 것)

//onAddTodo가 받을 타입은 함수 타입, 그럼 함수 타입은 어떻게 정의해야 할까? 함수를 정의하는 것 처럼 화살표 함수를 이용해서 정의하면된다.
//함수명: (매개변수: 타입) => 반환 타입
const TodoInput: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
    //useRef는 HTML에서 연결되는 모든 ref에 연결될 수 있음 -> 즉 우리는 생성하는 ref에 정확히 어떤 요소를 저장할 건지 구체적으로 설정해야 함
    //여기서는 Input과 연결됨
    //이렇게 해주면 useRef에서 생성하는 레퍼런스가 HTMLInputElement와 연결된다는게 명확해짐
    //useRef를 통해서 생성되는 ref는 HTMLInputElement와 연결되고 시작 값으로 null을 가짐
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        //typescript는 event객체에 대해서 모르기 때문에 타입을 지정해주지 않으면 event에 대해서 타입을 모른다고 타입스크립트 오류를 띄워준다
        //나중에 formEvent에 대한 event객체를 받게됨
        //React.FomEvent는 특수 타입으로 react 패키지가 제공하는 타입 / 이것과 비슷하게 MouseEvent도 존재함
        //만약에 event: React.MouseEvent라고 한 후에 진행을 하게 되면 onSubmit을 넣게 되면 오류가 발생함 --> 왜냐하면 리액트가 onSubmit 프로퍼티에 지정되는 함수가 FomrEvent 타입 인자를 포함하고 있으니까
        event.preventDefault();
        //?가 붙는 이유는 레퍼런스에 아직 값이 설정되지 않았을 수도 있기 때문에
        //submitHandler를 호출한 시점에 todoTextInputRef가 요소와 연결되기 때문에 -> 이 함수는 폼이 제출될 때만 호출될거고 폼이 제출되는 거는 레퍼런스가 연결된 다음이므로 이 함수가 호출될 시점에는 항상 레퍼런스가 연결되어있을껏

        //이 함수 호출 시점에 ref가 이미 정의된 후 -> 하지만 타입스크립트는 ref가 요소와 연결되어있는지 아닌지 모르기 때문에 일단 접근을 해보고 접근이 가능하면 접근을 하고 아니면 null을 가짐
        //null일수도 있는 값에 ?을 사용
        //이렇게 해서 그 값에 접근해서 null이면 타입이 들어갈 곳에 null을 저장
        //하지만 !을 사용한다면 그 값의 타입은 절대 null이 들어갈 수 있다는 것을 의미함
        const enteredText = todoTextInputRef.current!.value;

        if (enteredText?.trim().length === 0) {
            return; //throw an  error
        }

        //여기서 함수를 호출함(해당 함수는 App컴포넌트에 있음 --> 즉 App컴포넌트에서는 함수 자체를 전달하는 것이 아니라 함수 포인터를 전달함
        //그럼 함수 포인터는 어떻게 전달하느냐? -> props를 통해서 함수포인터를 전달함)
        //이렇게 하면 onAddTodo함수를 호출하고 이 함수는 enteredText를 인자로 전달함
        props.onAddTodo(enteredText);
    };
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="text">Todo text</label>
            {/* 타입스크립트에서 ref에 대한 타입정의가 없다면 오류가 남  --> 어떤 HTml요소든 들어갈 수 있으므로
            또한 submitHandler가 todo에 무언가 입력되기 전에는 호출되지 않음*/}
            <input type="text" id="text" ref={todoTextInputRef}></input>
            <button>Add Todo</button>
        </form>
    );
};

export default TodoInput;
