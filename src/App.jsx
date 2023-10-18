import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("Dropdown button");
  const options = [
    { name: "Action One", id: 1 },
    { name: "Action Two", id: 2 },
    { name: "Action Three", id: 3 },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const selectOption = (name) => {
    setSelectedName(name);
    setIsOpen(false);
  };

  const dropDownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dropDownRef.current.querySelector(".dropdown-item").focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();

          const currentElement = document.activeElement;
          const nextElement = currentElement.nextElementSibling;

          if (nextElement && nextElement.classList.contains("dropdown-item")) {
            nextElement.focus();
          }

          break;

        case "ArrowUp":
          e.preventDefault();

          const current = document.activeElement;
          const prevElement = current.previousElementSibling;
          if (prevElement && prevElement.classList.contains("dropdown-item")) {
            prevElement.focus();
          }
          break;

        case "Enter":
          e.preventDefault();
          selectOption(document.activeElement.getAttribute("data-name"));
          break;

        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
      
    }
  };

  return (
    <div className="dropdown" ref={dropDownRef}>
      <button className="" onClick={toggleDropdown}>
        {selectedName}
      </button>
      {isOpen && (
        <div className="dropdown-menu" onKeyDown={handleKeyDown} tabIndex="0">
          {options.map((option) => (
            <a
              key={option.id}
              href="#"
              className="dropdown-item"
              data-name={option.name}
              onClick={() => selectOption(option.name)}
            >
              {option.name}
            </a>
          ))}
        </div>
      )}
    </div>

  );
};
export default App;

