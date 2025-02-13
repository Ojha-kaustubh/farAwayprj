export default function Stats({ items }) {
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
  