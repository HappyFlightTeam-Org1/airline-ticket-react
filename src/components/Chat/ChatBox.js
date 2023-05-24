import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "./ChatBox.css";

const ChatBox = ({ isOpen, onClose, children, user }) => {
  return (
    <div className="chat">
   {user !== "admin" &&  <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      overlayClassName="chat-overlay"
      portalClassName="chat-portal"
      className="my-modal"
    >
      {children}
      <button onClick={onClose} className="btn-x">X</button>
      
        <div className="container">
          <div className="chat-content">
            {user}11111
            <div className="chat-user">
            <ul className="chat-messages">
              {/* {publicChats.map((chat, index) => (
                      <li
                        className={`message ${
                          chat.senderName === userData.username && "self"
                        }`}
                        key={index}
                      >
                        {chat.senderName !== userData.username && (
                          <div className="avatar">{chat.senderName}</div>
                        )}
                        <div className="message-data">{chat.message}</div>
                        {chat.senderName === userData.username && (
                          <div className="avatar self">{chat.senderName}</div>
                        )}
                      </li>
                    ))} */}
            </ul>
            </div>
            <div className="send-message">
              <input
                type="text"
                className="input-message"
                placeholder="enter the message"
                value={"userData.message"}
                // onChange={handleMessage}
              />
              <button
                type="button"
                className="send-button"
                //  onClick={sendValue}
              >
                send
              </button>
            </div>
          </div>
        </div>
      
      {user === "" && <div><h2>Khong co user</h2></div>}

      {children}
    </ReactModal>}
    {user === "admin" &&  <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      overlayClassName="chat-overlay"
      portalClassName="chat-portal"
      className="my-modal-admin"
    >
      {children}
      <button onClick={onClose} className="btn-x-admin">X</button>
     <div className="container">adminnnnnn2</div>
     <div className="chat-box">
              <div className="member-list">
                <ul>
                  <li
                    // onClick={() => {
                    //   setTab("CHATROOM");
                    // }}
                    // className={`member ${tab === "CHATROOM" && "active"}`}
                  >
                    Chatroom
                  </li>
                  {/* {[...privateChats.keys()].map((name, index) => (
                    <li
                      onClick={() => {
                        setTab(name);
                      }}
                      className={`member ${tab === name && "active"}`}
                      key={index}
                    >
                      {name}
                    </li>
                  ))} */}
                </ul>
              </div>
              
                <div className="chat-content">
                  <ul className="chat-messages">
                    {/* {[...privateChats.get(tab)].map((chat, index) => (
                      <li
                        className={`message ${
                          chat.senderName === userData.username && "self"
                        }`}
                        key={index}
                      >
                        {chat.senderName !== userData.username && (
                          <div className="avatar">{chat.senderName}</div>
                        )}
                        <div className="message-data">{chat.message}</div>
                        {chat.senderName === userData.username && (
                          <div className="avatar self">{chat.senderName}</div>
                        )}
                      </li>
                    ))} */}
                  </ul>

                  <div className="send-message">
                    <input
                      type="text"
                      className="input-message"
                      placeholder="enter the message"
                    //   value={userData.message}
                    //   onChange={handleMessage}
                    />
                    <button
                      type="button"
                      className="send-button"
                     // onClick={sendPrivateValue}
                    >
                      send
                    </button>
                  </div>
                </div>
              
            </div>
      {children}
    </ReactModal>}
    </div>
  );
};

export default ChatBox;
