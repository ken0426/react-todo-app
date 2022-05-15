import React, { useState } from "react";

export const IncompleteTodo = ({
  Todo,
  onClickComplete,
  onClickDelete,
  onChange,
}) => {
  const [update, setUpdata] = useState(false);

  const onChanges = (id, input) => {
    Todo.map((todo) => {
      if (todo.id === id) {
        todo.todoText = input;
        onChange(todo);
      }
    });
  };

  const handleEdit = (id) => {
    Todo.map((todo) => {
      if (todo.id === id) {
        todo.check = true;
        setUpdata(update ? false : true);
      }
    });
  };

  const onClickEdit = (id, input) => {
    Todo.map((todo) => {
      if (todo.id === id) {
        if (input === "") {
          alert("テキストを入力しないと保存できません");
        } else {
          todo.check = false;
          setUpdata(update ? false : true);
        }
      }
    });
  };

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {Todo.map((todo, index) => {
          return (
            <li className="list-row" key={todo.id}>
              {!todo.check ? (
                <>
                  <p>{todo.todoText}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                  <button onClick={() => handleEdit(todo.id)}>編集</button>
                </>
              ) : (
                <div className="compilation-area" key={todo.id}>
                  <input
                    placeholder="TODOを編集する"
                    value={todo.todoText}
                    onChange={(e) => onChanges(todo.id, e.target.value)}
                  />
                  <div className="edit-area">
                    <button onClick={() => onClickEdit(todo.id, todo.todoText)}>
                      内容を変更する
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
