import { useState, useEffect, useRef } from "react";
import "./RoundButton.css";

function RoundButton({ onOpen, isOpen, onClose, onClick }) {
  return (
    <button
      onClick={isOpen ? onClose : onOpen}
      className="round-button"
      style={{ bottom: "40px", right: "30px" }}
    >
      Click me
    </button>
  );
}

export default RoundButton;
