import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import MenuTile from "./MenuTile";

export default function MenuComponent({ items }) {
  const { isAdmin, authed } = useContext(UserContext);
  return (
    <div>
      {items.map((item) => (
        <MenuTile key={item.id} item={item} />
      ))}
    </div>
  );
}
