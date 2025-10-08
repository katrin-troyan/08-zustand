"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const predefinedTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <a
              href={`/notes/filter/all`}
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </a>
          </li>

          {predefinedTags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <a
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TagsMenu;
