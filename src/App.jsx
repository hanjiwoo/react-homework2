import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let [title, settitle] = useState("");
  let [content, setcontent] = useState("");
  let [card, setcard] = useState([]);
  let [movedcards, setmovedcards] = useState([]);

  let titleinput = function (e) {
    settitle(e.target.value);
  };
  let contentinsput = function (e) {
    setcontent(e.target.value);
  };
  let plusbutton = function () {
    let newCard = {
      id: card.length + 1,
      title: title,
      content: content,
    };

    setcard([...card, newCard]);
    settitle("");
    setcontent("");
  };
  const deleteButton = function (id) {
    const newcards = card.filter(function (item) {
      return item.id !== id;
    });
    setcard(newcards);
  };

  const deleteButton2 = function (id) {
    const newcards2 = movedcards.filter(function (item) {
      return item.id !== id;
    });
    setmovedcards(newcards2);
  };

  const completebutton = function (id) {
    const foundCard = card.find((item) => item.id === id);
    if (foundCard) {
      setcard(card.filter((item) => item.id !== id));

      setmovedcards([...movedcards, foundCard]);
    }
  };

  const backtoworkingbtn = function (id) {
    const foundCard2 = movedcards.find((item) => item.id === id);
    if (foundCard2) {
      setmovedcards(movedcards.filter((item) => item.id !== id));

      setcard([...card, foundCard2]);
    }
  };

  return (
    <>
      <h1>MY TO DO LIST </h1>
      <div className="searchbox">
        제목 : <input type="text" value={title} onChange={titleinput}></input>
        &nbsp; 내용 :
        <input type="text" value={content} onChange={contentinsput}></input>
        &nbsp; <button onClick={plusbutton}>추가하기</button>
      </div>

      <h1>WORKING!</h1>
      <div>
        {card.map(function (item) {
          return (
            <div key={item.id} className="cardStyle">
              <h3> {item.title}</h3>
              <br />
              {item.content}
              <br />
              <button onClick={() => deleteButton(item.id)}>삭제하기</button>
              &nbsp;
              <button onClick={() => completebutton(item.id)}>완료</button>
            </div>
          );
        })}
      </div>
      <h1>DONE!</h1>
      <div>
        {movedcards.map(function (item) {
          return (
            <div key={item.id} className="cardStyle">
              <h3> {item.title}</h3>
              <br />
              {item.content}
              <br />
              <button onClick={() => deleteButton2(item.id)}>삭제하기</button>
              &nbsp;
              <button onClick={() => backtoworkingbtn(item.id)}>취소</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
