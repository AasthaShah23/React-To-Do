import React, { useEffect, useState } from "react";
import { PiMoonStarsFill } from "react-icons/pi";
import { IoSunny } from "react-icons/io5";
import "./ToDomain.css";

const ToDomain = () => {
    // localStorage.clear();

  // change mode code starts

  const [theme, setTheme] = useState("light-theme");

  const toggleTheme = () => {
    theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // change mode code ends

  // add list code starts

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allToDos, setAllToDos] = useState([]);

  const handleToDos = () => {
    // console.log('hii');
    let todoarr = {
      newTitle: title,
      newDescription: description,
    };

    if (!title) {
      alert("Empty field not allowed..");
    } else if (!description) {
      alert("Empty field not allowed..");
    } else if (edit.active) {
      console.log(edit.id);
      console.log(todoarr);
      setAllToDos(
        allToDos.map((elem, key) => {
          console.log("start");
          if (key == edit.id) {
            return { ...elem, newTitle: title, newDescription: description };
          }
          // return elem
        })
      );

      setTitle("");
      setDescription("");
      localStorage.setItem("todo-lists", JSON.stringify([...allToDos]));
    } else {
      setAllToDos([...allToDos, todoarr]);
      setTitle("");
      setDescription("");
      // console.log('todolists....');
      // console.log(allToDos);
      localStorage.setItem(
        "todo-lists",
        JSON.stringify([...allToDos, todoarr])
      );
    }
  };

  // add list code ends

  // delete list code start

  const deleteItem = (key) => {
    const reducedItem = [...allToDos];
    reducedItem.splice(key, 1);
    // console.log(reducedItem);
    localStorage.setItem("todo-lists", JSON.stringify([...reducedItem]));
    setAllToDos(reducedItem);
    setTitle("");
      setDescription("");
  };

  //delete list code ends

  // complete list code start

  const [completeToDo, setCompleteToDo] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const completeItem = (key) => {
    let filteredItem = {
      ...allToDos[key],
    };

    setCompleteToDo([...completeToDo, filteredItem]);
    console.log("complete lists...");
    console.log(completeToDo);
    localStorage.setItem(
      "complete-lists",
      JSON.stringify([...completeToDo, filteredItem])
    );
    deleteItem(key);
    console.log("completed");
  };

  const deleteCompleteItem = (key) => {
    const reducedCompleteItem = [...completeToDo];
    reducedCompleteItem.splice(key, 1);
    // console.log(reducedCompleteItem);
    localStorage.setItem(
      "complete-lists",
      JSON.stringify([...reducedCompleteItem])
    );
    setCompleteToDo(reducedCompleteItem);
  };

  //complete code ends

  //redo code start

  const redoItem = (key) => {
    console.log("redo");

    let reTodoItem = {
      ...completeToDo[key],
    };

    console.log(reTodoItem);

    setAllToDos([...allToDos, reTodoItem]);
    console.log("alltodo lists...");
    // console.log(redo);
    localStorage.setItem(
      "todo-lists",
      JSON.stringify([...allToDos, reTodoItem])
    );

    deleteCompleteItem(key);
  };

  //edit code start

  const [edit, setEdit] = useState({
    active: false,
    id: null,
  });

  const editToDo = (key) => {
    console.log("edit");

    let tODO = allToDos.find(function (elem, index) {
      return index === key;
    });
    // console.log(tODO);

    setTitle(tODO.newTitle);
    setDescription(tODO.newDescription);

    setEdit({
      active: true,
      id: key,
    });
  };

  //edit code ends

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todo-lists"));
    if (savedTodo) {
      setAllToDos(savedTodo);
    }

    let completedTODO = JSON.parse(localStorage.getItem("complete-lists"));
    if (completedTODO) {
      setCompleteToDo(completedTODO);
    }
  }, []);

  const [activeButton, setActiveButton] = useState(1);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <div className="todo-body">
      <div className="toggle-mode">
        {/* <button onClick={toggleTheme}>{theme}</button> */}
        <button onClick={toggleTheme}>
          {theme === "dark-theme" ? (
            <PiMoonStarsFill size={30} />
          ) : (
            <IoSunny size={30} />
          )}
        </button>
      </div>
      <h1>My ToDo's</h1>
      <section>
        <div className="todo-items">
          <div className="todo-title">
            <label>Title</label>
            <input
              type="text"
              placeholder="What is your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="todo-desc">
            <label>Description</label>
            <input
              type="text"
              placeholder="What is your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="todo-btn">
            <button type="button" onClick={handleToDos}>
              Add
            </button>
          </div>
        </div>

        <hr />

        <div className="btn-area">
          <button
            style={{ backgroundColor: activeButton === 1 ? "#07c5f5" : "" }}
            onClick={() => {
              handleButtonClick(1);
              setIsCompletedScreen(false);
            }}
          >
            ToDo
          </button>

          <button
            style={{ backgroundColor: activeButton === 2 ? "#07c5f5" : "" }}
            onClick={() => {
              handleButtonClick(2);
              setIsCompletedScreen(true);
            }}
          >
            Completed
          </button>
        </div>

        {isCompletedScreen === false &&
          allToDos.map((item, key) => {
            return (
              <div className="todo-lists" key={key}>
                <div className="todo-list">
                  <h3>{item.newTitle}</h3>
                  <p>{item.newDescription}</p>
                </div>
                <div className="todo-icon">
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => editToDo(key)}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteItem(key)}
                  ></i>
                  <i
                    className="fa-solid fa-check"
                    onClick={() => completeItem(key)}
                  ></i>
                </div>
              </div>
            );
          })}

        {isCompletedScreen === true &&
          completeToDo.map((item, key) => (
            <div className="todo-lists" key={key}>
              <div className="todo-list">
                <h3>{item.newTitle}</h3>
                <p>{item.newDescription}</p>
              </div>
              <div className="todo-icon">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteCompleteItem(key)}
                ></i>
                <i
                  className="fa-sharp fa-solid fa-rotate-right"
                  onClick={() => redoItem(key)}
                ></i>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ToDomain;

// import React, { useState } from 'react';
// const App = () => {
//   const [activeButton, setActiveButton] = useState(1);
//   const handleButtonClick = (buttonNumber) => {
//     setActiveButton(buttonNumber);
//   };
//   return (
//     <div>
//       <button
//         style={{ backgroundColor: activeButton === 1 ? 'blue' : 'white' }}
//         onClick={() => handleButtonClick(1)}
//       >
//         Page 1
//       </button>
//       <button
//         style={{ backgroundColor: activeButton === 2 ? 'blue' : 'white' }}
//         onClick={() => handleButtonClick(2)}
//       >
//         Page 2
//       </button>
//       {/* Render different pages based on activeButton */}
//       {activeButton === 1 && <Page1 />}
//       {activeButton === 2 && <Page2 />}
//     </div>
//   );
// };
// const Page1 = () => {
//   return <div>This is Page 1 content.</div>;
// };
// const Page2 = () => {
//   return <div>This is Page 2 content.</div>;
// };
// export default App;
