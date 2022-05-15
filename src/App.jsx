import React, { useState } from "react";
import "./style.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

// 追加機能
const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  const [id, setId] = useState(0);
  const [incompleteTodo, setIncompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText !== "" && todoText.trim(0)) {
      // ...→配列の順番を設定
      setId(id + 1);
      const check = false;
      const newTodo = [...incompleteTodo, { todoText, id, check }];
      setIncompleteTodo(newTodo);
      setTodoText("");
    } else {
      alert("テキストを入力してください");
    }
  };

  // 削除機能
  const onClickDelete = (index) => {
    const newTodo = [...incompleteTodo];
    // splice
    //一つ目の引数に何番目の要素を受け取って2つ目の要素にいくつ削除するかを指定できる
    newTodo.splice(index, 1);
    setIncompleteTodo(newTodo);
  };
  // 完了機能
  const onClickComplete = (index) => {
    const newIncompleteTodo = [...incompleteTodo];
    newIncompleteTodo.splice(index, 1);

    const newCompleteTodo = [...completeTodo, incompleteTodo[index]];
    //**  未完了タスクに入る配列*/
    setIncompleteTodo(newIncompleteTodo);

    //** 完了済みに入るタスクの配列 */
    setCompleteTodo(newCompleteTodo);
  };

  // 戻る機能
  const onClickBack = (index) => {
    const newIncompleteTodo = [...incompleteTodo, completeTodo[index]];
    const newCompleteTodo = [...completeTodo];
    newCompleteTodo.splice(index, 1);
    setCompleteTodo(newCompleteTodo);
    setIncompleteTodo(newIncompleteTodo);
  };

  // 編集機能
  const onChangeTodoEdit = (event) => {
    setTodoEdit(event.todoText);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodo.length >= 5}
      />
      {incompleteTodo.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できる上限を超えています。先に消化してから追加してください。
        </p>
      )}
      <IncompleteTodo
        Todo={incompleteTodo}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        todoEdit={todoEdit}
        onChange={onChangeTodoEdit}
      />
      <CompleteTodo Todo={completeTodo} onClickBack={onClickBack} />
    </>
  );
};

export default App;
