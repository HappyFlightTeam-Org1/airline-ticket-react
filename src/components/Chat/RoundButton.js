import { useState, useEffect, useRef } from "react";
import "./RoundButton.css";

function RoundButton({ onOpen, isOpen, onClose, onClick }) {
  return (
    <button
      onClick={isOpen ? onClose : onOpen}
      className="round-button"
      style={{ bottom: "40px", right: "30px" }}
    >
      <i class="fa-brands fa-rocketchat"></i>
    </button>
  );
}

export default RoundButton;
