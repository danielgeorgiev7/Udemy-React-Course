import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList, Stats } from "./PackingList";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id))
  }

  function toggleItem(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  function clearItems() {
    const confirmed = window.confirm('Are you sure you want to delete all items?');
    if(confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form 
        onAddItem={handleAddItem} />
      <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggleItem={toggleItem} 
        onClearItems = {clearItems}/>
      <Stats 
        items={items} />
    </div>
  );
}


