import React from "react";
import MenuTile from "./MenuTile";

export default function MenuComponent({ items }) {
  return (
    <div className="menuComponentWrapper">
      {items.map((item) => (
        <MenuTile key={item.id} item={item} />
      ))}
    </div>
  );
}
