import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactModal from "react-modal";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./ChatBox.css";
import axios from "axios";

var stompClient = null;
const ChatBox = ({ isOpen, onClose, children, user }) => {
  const [listUserNew, setListUserNew] = useState([]);
  const chatMessagesRef = useRef(null);
  const [listUser, setListUser] = useState([]);
  const [listAllUser, setListALLUser] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [reciptientname, setReciptientName] = useState("");
  const [reciptientnamecurrent, setReciptientNamecurrent] = useState("");
  const [userData, setUserData] = useState({
    sender: user,
    reciptient: "",
    content: "",
    timestamp: "",
  });
  const [editable, setEditable] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [activeIndex, setActiveIndex] = useState("");
  const [componentOpened, setComponentOpened] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleButtonClick = () => {
    setEditable(true); // Cập nhật state của editable là true khi button được click
  };
  const handleClick = (name) => {
    setActiveIndex(name);
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleMessage = (event) => {
    if (!editable) {
      setEditable(true);
    }
    setButtonDisabled(false);
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
  const handleComponentOpen = () => {
    setComponentOpened(true);
  };
  const handleComponentClose = () => {
    setComponentOpened(false);
  };

  const connect = () => {
    const Sock = new SockJS("http://localhost:8080/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected);
  };

  const onConnected = () => {
    stompClient.subscribe("/user/" + user + "/queue/messages", (message) => {
      //  if(reciptientnamecurrent!==""&&reciptientnamecurrent===message.body.sender){
      setListMessage((listMessage) => [
        ...listMessage,
        JSON.parse(message.body),
      ]);

      console.log(listMessage, "Day la list message sau khi nhan dc message");
    });
    console.log("WebSocket connected"); // Thêm log để kiểm tra kết nối WebSocket
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && userData.content !== "") {
      sendPrivateValue(); // Gọi hàm xử lý khi người dùng nhấn phím Enter
    }
  };

  const sendPrivateValue = () => {
    if (userData.content !== "") {
      if (stompClient && stompClient.connected) {
        setUserData({ ...userData, reciptient: reciptientname });
        setUserData({ ...userData, sender: user });
        const message = userData;
        message.sender = user;
        message.reciptient = reciptientname;
        console.log(message, "day la message truoc khi gui");
        stompClient.send(`/app/message`, {}, JSON.stringify(message));
        setUserData({ ...userData, content: "" });
      } else {
        alert("WebSocket connection has not been established yet");
      }
    } else {
      alert("Hãy nhập nội dung cho tin nhắn!!");
    }
  };

  function getChat(name) {
    console.log("name", name);
    axios
      .delete(`http://localhost:8080/chat-box/delete-new-message/${name}`)
      .catch((error) => console.error);
    updateListUserNew();
    axios
      .get(`http://localhost:8080/chat-box/getchat?user=${name}`)
      .then((response) => {
        const data = response.data;
        setListMessage(data);
      })
      .catch((error) => console.error);
    setReciptientName(name);
    console.log("ListMessage", listMessage);

    if (chatMessagesRef.current) {
      const chatMessages = chatMessagesRef.current;
      chatMessages.scrollTop =
        chatMessages.scrollHeight - chatMessages.clientHeight;
    }
    handleClick(name);
    handleButtonClick();
    setReciptientNamecurrent(name);
  }
  useEffect(() => {
    if (searchText !== "") {
      const filteredUsers = listAllUser.filter((user) =>
        user.toLowerCase().includes(searchText.toLowerCase())
      );
      setListUser(filteredUsers);
    } else {
      axios
        .get(`http://localhost:8080/chat-box/user`)
        .then((response) => {
          const data = response.data;
          setListUser(data);
        })
        .catch((error) => console.error);
    }
  }, [searchText, listUserNew]);
  const updateListUserNew = () => {
    axios
      .get(`http://localhost:8080/chat-box/new-message`)
      .then((response) => {
        const data = response.data;
        setListUserNew(data);
      })
      .catch((error) => console.error);
  };
  // const updateListUserNew = () => {
  //   axios
  //     .get(`http://localhost:8080/chat-box/new-message`)
  //     .then((response) => {
  //       const data = response.data;
  //       setTimeout(() => {
  //         setListUserNew((prevListUserNew) => {
  //           // update the relevant quantity in the listUserNew array
  //           const newListUserNew = [...prevListUserNew];
  //           data.forEach((newUser) => {
  //             const index = newListUserNew.findIndex((user) => user.user === newUser.user);
  //             if (index !== -1) {
  //               newListUserNew[index].quantity = newUser.quantity;
  //             }
  //           });
  //           return newListUserNew;
  //         });
  //       }, 1000); // add a delay of 1 second before updating the state
  //     })
  //     .catch((error) => console.error);
  // };
  useEffect(() => {
    console.log("day la listmessage mới");
    if (searchText === "") {
      if (user === "admin") {
        axios
          .get(`http://localhost:8080/chat-box/user`)
          .then((response) => {
            const data = response.data;
            setListUser(data);
          })
          .catch((error) => console.error);
      }
    }
    if (user === "admin") {
      console.log("day la listmessage", listMessage);
      console.log("day la listUserNew truoc khi them: ", listUserNew);
      if (Array.isArray(listMessage) && listMessage.length > 0) {
        const lastms = listMessage[listMessage.length - 1]?.sender;
        if (lastms && lastms !== reciptientnamecurrent && lastms !== "admin") {
          console.log("Day la last message", lastms);
          console.log("Day la reciptientnamecurrent", reciptientnamecurrent);
          axios
            .get(`http://localhost:8080/chat-box/save-new-message/${lastms}`)
            .catch((error) => console.error);
          //updateListUserNew();
          // axios
          //   .get(`http://localhost:8080/chat-box/new-message`)
          //   .then((response) => {
          //     const data = response.data;
          //     setListUserNew(data);
          //   })
          //   .catch((error) => console.error);
          getChat(reciptientnamecurrent);
        }
      }
    }
  }, [listMessage]);

  useEffect(()=>{
        updateListUserNew();
  },[listMessage])
 
  useEffect(()=>{
    updateListUserNew();
},[])

  useEffect(() => {
    if (componentOpened && chatMessagesRef.current) {
      const chatMessages = chatMessagesRef.current;
      chatMessages.scrollTop =
        chatMessages.scrollHeight - chatMessages.clientHeight;
    } else if (!componentOpened && chatMessagesRef.current) {
      const chatMessages = chatMessagesRef.current;
      const callback = () => {
        chatMessages.scrollTop =
          chatMessages.scrollHeight - chatMessages.clientHeight;
      };
      requestAnimationFrame(callback);
    }
  }, [componentOpened, listMessage]);

  useEffect(() => {
    if (user === "admin") {
      axios
        .get(`http://localhost:8080/chat-box/user`)
        .then((response) => {
          const data = response.data;
          setListUser(data);
          setListALLUser(data);
        })
        .catch((error) => console.error);
      axios
        .get(`http://localhost:8080/chat-box/new-message`)
        .then((response) => {
          const data = response.data;
          setListUserNew(data);
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
      if (chatMessagesRef.current) {
        const chatMessages = chatMessagesRef.current;
        chatMessages.scrollTop =
          chatMessages.scrollHeight - chatMessages.clientHeight;
      }
    }
    if (user !== "") {
      connect();
    }
  }, [user]);

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
          onAfterOpen={handleComponentOpen}
          onAfterClose={handleComponentClose}
        >
          {children}
          <div className="user-info">
          <div className="user-name">Chào mừng <span className="user">{user}</span> đến với Happy-Flight!</div>
          <button onClick={onClose} className="btn-x">
            X
          </button>
          </div>
          <div className="container">
            <div className="chat-box-user">
              <div className="chat-content-user">
                <div className="chat-user">
                  <ul className="chat-messages-user" ref={chatMessagesRef}>
                    {console.log("Day la listmessage ben user", listMessage)}
                    {Array.isArray(listMessage) &&
                      listMessage.map((chat, index) => (
                        <li
                          className={`message ${
                            chat.sender !== "admin" ? "self" : "client"
                          }`}
                          key={index}
                        >
                          <div className="message-data">{chat.content}</div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="send-message-user">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="Nhập tin nhắn"
                    value={userData.content}
                    onChange={handleMessage}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"

                    className="send-chat"
                    onClick={sendPrivateValue}
                    disabled={buttonDisabled}
                  >
                    <i class="fa-regular fa-paper-plane"></i>
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
          <div className="tieu-de">
            <div className="wrap">CHAT ROOM</div>
            <button onClick={onClose} className="btn-x-admin">
              X
            </button>
          </div>
          <div className="chat-box">
            <div className="member-list">
              <input
                className="btn-search"
                type="text"
                value={searchText}
                onChange={handleSearch}
                placeholder="Search users"
              />
              <ul className="list-member">
                {listUser.length > 0 &&
                  listUser.map(
                    (item, index) =>
                      item !== "admin" && (
                        <li key={index}>
                          <button
                            className={
                              activeIndex === item ? "active btn-li" : "btn-li"
                            }
                            onClick={() => getChat(item)}
                          >
                            {item}
                          </button>
                          {listUserNew.find(
                            (newUser) => newUser.user === item
                          ) &&
                            (() => {
                              let newUserFound = listUserNew.find(
                                (newUser) => newUser.user === item
                              );
                              return (
                                <div className="btn-new">{`${newUserFound.quatity}`}</div>
                              );
                            })()}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="chat-content">
              <div className="chat-wrap-ul">
                {editable && (
                  <ul
                    className="chat-messages"
                    ref={chatMessagesRef}
                    onLoad={handleComponentOpen}
                  >
                    {console.log("Day la listmessage ben admin", listMessage)}
                    {Array.isArray(listMessage) &&
                      listMessage.map(
                        (chat, index) =>
                          (chat.sender === reciptientnamecurrent ||
                            chat.sender === "admin") && (
                            <li
                              className={`message ${
                                chat.sender === "admin" ? "self" : "client"
                              }`}
                              key={index}
                            >
                              <div className="message-data">{chat.content}</div>
                            </li>
                          )
                      )}
                  </ul>
                )}
              </div>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="Nhập tin nhắn"
                  value={userData.content}
                  onChange={handleMessage}
                  onKeyDown={handleKeyDown}
                  readOnly={!editable}
                />
                <button
                  type="button"
                  className="send-chat"
                  onClick={sendPrivateValue}
                  disabled={buttonDisabled}
                >
                  <i class="fa-regular fa-paper-plane"></i>
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
