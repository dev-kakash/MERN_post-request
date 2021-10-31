import { useRef } from "react";
import "./App.css";

function App() {
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    const newPerson = { name, phone };
    console.log(newPerson);

    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).then((res) => res.json());
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="text" placeholder="phone" ref={phoneRef} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
