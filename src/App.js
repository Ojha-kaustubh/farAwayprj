import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

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

function Form({ onAddItem }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // page is not refresh again
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);

    setdescription("");
    setquantity(1);
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <ul className="List">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>✖️</button>
    </li>
  );
}

function Stats({ items }) {
  // if (!items.packed)
  //   return (
  //     <p className="stats">
  //       <em>💼 No Items Are Packed</em>
  //     </p>
  //   );

  let numsItems = items.length;
  let ItemsPacked = items.filter((item) => item.packed).length;
  let percentage = (ItemsPacked / numsItems) * 100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "All Items Are Packed"
          : `💼 You Have ${numsItems} items on your List , and you already Packed${" "}
        ${ItemsPacked}
        (${percentage}%)`}
      </em>
    </footer>
  );
}
