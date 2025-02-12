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

  function handleClearList() {
    const confirmed = window.confirm("Are you Want to Delete all Items?");
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 💼 </h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // page is not refreshed again
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You need for your 😍 Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
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
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = [...items];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
        onClick={() => onToggleItem(item.id)}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>✖️</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <p className="stats">
        <em>💼 No Items Are Packed</em>
      </p>
    );
  }

  const numItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const percentage = (itemsPacked / numItems) * 100;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "All Items Are Packed"
          : `💼 You Have ${numItems} items on your List, and you already Packed ${itemsPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
