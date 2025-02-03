import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "passports", quantity: 2, packed: true },
  { id: 2, description: "socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 💼 </h1>;
}

function Form() {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault(); // page is not refresh again
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You need for your 😍 Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <ul className="List">
      {initialItems.map((item) => (
        <Item item={item} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.id}
        {item.description}
      </span>
      <button>✖️</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You Have X items on your List , and you already Packed X (X%)</em>
    </footer>
  );
}
