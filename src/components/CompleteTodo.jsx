import React from "react";

export const CompleteTodo = (props) => {
  const { Todo, onClickBack } = props;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {Todo.map((todo, index) => {
          return (
            <li key={todo.id} className="list-row">
              <p>{todo.todoText}</p>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
