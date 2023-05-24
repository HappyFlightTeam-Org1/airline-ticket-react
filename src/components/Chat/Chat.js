import React, { useEffect, useState,useRef } from "react";
import ReactModal from "react-modal";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./ChatBox.css";
import axios from "axios";
import Stomp from 'stompjs';

var stompClient = null;
const ChatBox = ({ isOpen, onClose, children, user }) => {
  
  const [listUser, setListUser] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [reciptientname, setReciptientName] = useState("");
  const [userData, setUserData] = useState({
    sender: user,
    reciptient: "",
    content: "",
    timestamp: "",
  });
  

  

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };

  useEffect(() => {
    if (user === "admin") {
      axios
        .get(`http://localhost:8080/chat-box/user`)
        .then((response) => {
          const data = response.data;
          setListUser(data);
        })
        .catch((error) => console.error);
    } else {
      axios
        .get(`http://localhost:8080/chat-box/getchat?user=${user}`)
        .then((response) => {
          const data = response.data;
          setListMessage(data);
          setReciptientName("admin");
        })
        .catch((error) => console.error);
    }
   if(user!==""){connect();}   
  }, [user]);

  const connect = () => {
    const Sock = new SockJS("http://localhost:8080/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected);
  };
  
  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + user +"/queue/messages",
      (message) => {
        setListMessage((listMessage) => [...listMessage, JSON.parse(message.body)]);
        console.log(listMessage,"Day la list message sau khi nhan dc message");
      }
    );
    console.log("WebSocket connected"); // Thêm log để kiểm tra kết nối WebSocket
  };
  
  const sendPrivateValue = () => {
    if (userData.content !== "") {
      if (stompClient && stompClient.connected) {
        setUserData({ ...userData, reciptient: reciptientname });
        setUserData({ ...userData, sender: user });
        const message = userData;
        message.sender=user;
        message.reciptient=reciptientname;
        console.log(message,"day la message truoc khi gui");
        stompClient.send(`/app/message`, {}, JSON.stringify(message));
        setUserData({ ...userData, content: "" });
      } else {
        alert("WebSocket connection has not been established yet");
      }
    } else {
      alert("Please enter content of message");
    }
  };
  

  function getChat(name) {
    console.log("name", name);
    axios
      .get(`http://localhost:8080/chat-box/getchat?user=${name}`)
      .then((response) => {
        const data = response.data;
        setListMessage(data);
      })
      .catch((error) => console.error);
    setReciptientName(name);
    console.log("ListMessage", listMessage);
  }


  return (
    <div className="chat">
      {user !== "admin" && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Example Modal"
          overlayClassName="chat-overlay"
          portalClassName="chat-portal"
          className="my-modal"
        >
          {children}
          <button onClick={onClose} className="btn-x">
            X
          </button>

          <div className="container">
            <div className="chat-box">
              <div className="chat-content">
                {user}
                <div className="chat-user">
                  <ul className="chat-messages">
                    {Array.isArray(listMessage) && listMessage.map((chat, index) => (
                      <li
                        className={`message ${
                          chat.sender !== "admin" && "self"
                        }`}
                        key={index}
                      >
                        <div className="message-data">{chat.content}</div>
                        {chat.senderName !== "admin" && (
                          <div className="avatar self">{chat.sender}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                </div>
                <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                     value={userData.content}
                    onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
              </div>
            </div>
          </div>

          {user === "" && (
            <div>
              <h2>Khong co user</h2>
            </div>
          )}

          {children}
        </ReactModal>
      )}
      {user === "admin" && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Example Modal"
          overlayClassName="chat-overlay"
          portalClassName="chat-portal"
          className="my-modal-admin"
        >
          {children}
          <button onClick={onClose} className="btn-x-admin">
            X
          </button>
          <div className="container">adminnnnnn2</div>
          <div className="chat-box">
            <div className="member-list">
              <ul>
                {listUser.length > 0 &&
                  listUser.map(
                    (item, index) =>
                      item !== "admin" && (
                        <li>
                          <button onClick={() => getChat(item)}>{item}</button>
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="chat-content">
              <ul className="chat-messages">
                {Array.isArray(listMessage) && listMessage.map((chat, index) => (
                  <li
                    className={`message ${chat.sender === "admin" && "self"}`}
                    key={index}
                  >
                    {chat.senderName !== "admin" && (
                      <div className="avatar">{chat.sender}</div>
                    )}
                    <div className="message-data">{chat.content}</div>
                    {chat.senderName === "admin" && (
                      <div className="avatar self">{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>
              

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                     value={userData.content}
                    onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          </div>
          {children}
        </ReactModal>
      )}
    </div>
  );
};

export default ChatBox;
