//함수형 컴포넌트를 만들때 props만 써주고 타입을 써주지 않는다면 에러가 날 것 --> 타입이 any로 간주되기때문엠

//타입스크립트를 이용해서 함수형 컴포넌트라는 것을 알리기 위해서는 React.FC를 추가해줘야 한다
//컴포넌트가 생성되자마자 가지고 있는 props는 children 프로퍼티밖에 없음  --> 내가 직접 지정한 props를 사용하기 위해서는 <{}>를 이용함
//즉, 우리가 정의한 프로퍼티를 기존 Props와 합칠 수 있음
//property는 언제나 객체이고 우리는 이 객체를 원래 있는 props와 합치 것 이므로
const TodoItems: React.FC<{ text: string }> = (props) => {
    return <li>{props.text}</li>;
};

export default TodoItems;

//방법2 --> text만 가져오는 것이 아니라 Todo객체 전체를 가져오는 것
/*import Todo from "../models/todo"; //Todo객체 전체를 가져오기 위해서는 반드시 필요함
const TodoItems: React.FC<{ todo: Todo }> = (props) => {
    return <li>{props.text}</li>;
};*/
