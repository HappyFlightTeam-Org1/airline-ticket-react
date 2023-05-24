import { useState, useEffect, useRef } from "react";
import "./RoundButton.css";

function RoundButton({ onOpen,isOpen,onClose, onClick}) {
//   const [bottom, setBottom] = useState(50); // thay đổi giá trị bottom thành 40
//   const [right, setRight] = useState(40); // thay đổi giá trị right thành 30

//   useEffect(() => {
//     function updateButtonPosition() {
//       const button = buttonRef.current;
//       const buttonRect = button.getBoundingClientRect();
//       let newBottom = window.innerHeight - buttonRect.bottom - 50; // cộng thêm 20px
//       let newRight = window.innerWidth - buttonRect.right - 40; // cộng thêm 10px
//       if (newBottom < 0) {
//         newBottom = 0;
//       }
//       if (newRight < 0) {
//         newRight = 0;
//       }
//       setBottom(newBottom);
//      setRight(newRight);
//     }

//     let handleAnimationFrame;
//     function handleScroll() {
//       if (handleAnimationFrame) {
//         cancelAnimationFrame(handleAnimationFrame);
//       }
//       handleAnimationFrame = requestAnimationFrame(updateButtonPosition);
//     }

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleScroll);
//       cancelAnimationFrame(handleAnimationFrame);
//     };
//   }, []);

//   const buttonRef = useRef(null);
  
  return (
    <button
    //   ref={buttonRef}
      onClick={isOpen?onClose:onOpen}
      className="round-button"
      style={{ bottom: '40px', right: '30px' }}
    >
      Click me
    </button>
  );
}

export default RoundButton;