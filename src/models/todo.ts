//여기서는 컴포넌트를 생성하지 않기 때문에 tsx라고 할 필요가 없다.
// interface Todo {
//     id: string;
//     text: string;
// }

class Todo {
    id: string;
    text: string;

    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}
export default Todo;

//정의만 하고 값을 할당하지 않으면 에러가 남 그러므로 생성자 함수를 통해서 값을 할당함

//이 파일은 Todo 객체에 대한 정의를 내린 파일

//자바스크립트에서는 프로퍼티를 선언하지 않고 constructor부분만 만들어도 동작했음
//하지만 타입스크립트를 사용할 때는 미리 프로퍼티를 정의하고 해당 프로퍼티에 어떤 타입을 가진 값이 저장되는지 명확히 밝혀야 함
