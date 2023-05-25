import React, { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./ChatBox.css";
import axios from "axios";

var stompClient = null;
const ChatBox = ({ isOpen, onClose, children, user }) => {
  const [listUserSendNew, setListUserSendNew] = useState([]);
  const [IsNewMessage, setIsnewMessage] = useState(false);
  const [userData2, setUserData2] = useState({
    sender: user,
    reciptient: "",
    content: "",
    time: "",
  });
  const [listMessageN, setListMessageN] = useState([]);
  const chatMessagesRef = useRef(null);
  const [listUser, setListUser] = useState([]);
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
    setIsnewMessage(false);
  };
  const handleComponentClose = () => {
    setComponentOpened(false);
  };

  const connect = () => {
    const Sock = new SockJS("http://localhost:8080/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected);
  };
  const handleListMessage = () => {
    console.log("loi64");
    if (listMessageN !== null) {
      console.log("loi66");
      if (user === "admin") {
        console.log("loi68");
        console.log("reciptientnamecurrent", reciptientnamecurrent);
        if (reciptientnamecurrent !== "") {
          console.log("loi70");
          if (listMessageN !== null && listMessageN.length > 0) {
            console.log("loi72");
            const lastMessage = listMessageN[listMessageN.length - 1];
            console.log("loi74, day la lastmeassage ben admin", lastMessage);
            if (lastMessage.sender !== undefined) {
              console.log("loi76");
              if (lastMessage && reciptientnamecurrent === lastMessage.sender) {
                console.log("loi78");
                setListMessage((listMessage) => [...listMessage, lastMessage]);
                console.log("loi80, day la listmessage ben admin", listMessage);
                // Truy cập thuộc tính "sender" của lastMessage ở đây
              }
            }
          }
        }
      } else {
        console.log("loi86");
        if (user !== "") {
          console.log("loi88");
          console.log("listMessageN", listMessageN);
          if (listMessageN !== null && listMessageN.length > 0) {
            console.log("loi90");
            const lastMessage = listMessageN[listMessageN.length - 1];
            console.log("92 day la lastmessage ben user", lastMessage);
            setListMessage((listMessage) => [...listMessage, lastMessage]);
            console.log("loi94, day la listmessage ben user", listMessage);
            // Truy cập thuộc tính "sender" của lastMessage ở đây
          }
        }
      }
    }
  };
  //  else {
  //   const lastMessage = listMessageN[listMessageN.length - 1];

  //   setListMessage((listMessage) => [...listMessage, lastMessage]);
  //    Truy cập thuộc tính "sender" của lastMessage ở đây
  // }

  // useEffect(()=>{
  //   if (listMessageN[0] !== null) {
  //     if (user === "admin") {
  //       if (reciptientnamecurrent !== "") {
  //         if (reciptientnamecurrent === listMessageN[listMessageN.length - 1].sender) {
  //     setListMessage((listMessage) => [...listMessage, listMessageN[listMessageN.length - 1]]);
  //   }
  //       }
  //     } else {
  //       setListMessage((listMessage) => [...listMessage, listMessageN[0]]);
  //     }
  //   }
  // },[]);

  const onConnected = () => {
    stompClient.subscribe("/user/" + user + "/queue/messages", (message) => {
      //  if(reciptientnamecurrent!==""&&reciptientnamecurrent===message.body.sender){
      setListMessage((listMessage) => [
        ...listMessage,
        JSON.parse(message.body),
      ]);
      // handleListMessage();
      // setUserData2(JSON.parse(message.body));
      // if(reciptientnamecurrent!==""&&reciptientnamecurrent===userData2.sender){
      //   setListMessage((listMessage) => [
      //     ...listMessage,
      //     JSON.parse(message.body),
      //   ]);
      // }
      //}
      //  (JSON.parse(message.body.sender)) !== "admin"
      //     ? setListUserSendNew(JSON.parse(message.body.sender))
      //     : setIsnewMessage(true);
      // axios
      //     .get(`http://localhost:8080/chat-box/user`)
      //     .then((response) => {
      //       const data = response.data;
      //       setListUser(data);
      //     })
      //     .catch((error) => console.error);

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

    if (chatMessagesRef.current) {
      const chatMessages = chatMessagesRef.current;
      chatMessages.scrollTop =
        chatMessages.scrollHeight - chatMessages.clientHeight;
    }
    handleClick(name);
    handleButtonClick();
    setListUserSendNew((prevList) =>
      prevList.filter((item) => item.content !== name)
    );
    setReciptientNamecurrent(name);
    const newItems = listUserSendNew.filter((i) => i !== name);
    setListUserSendNew(newItems);
  }
  useEffect(() => {
    if (searchText !== "") {
      const filteredUsers = listUser.filter((user) =>
        user.includes(searchText)
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
  }, [searchText]);
  useEffect(() => {
    if(searchText ===""){
    if (user === "admin") {
      axios
        .get(`http://localhost:8080/chat-box/user`)
        .then((response) => {
          const data = response.data;
          setListUser(data);
        })
        .catch((error) => console.error);
    }}
  }, [listMessage]);

  useEffect(() => {
    const adminIndex = listUser.indexOf(reciptientnamecurrent);
    const newListUser = listUser.slice(0, adminIndex);
    //const mergedListUser = listUserSendNew.concat(newListUser);
    setListUserSendNew((listUserSendNew) => [...listUserSendNew, newListUser]);
  }, [listUser]);

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

    //  const latestMessage = listMessage.slice(-1)[0];
    //  if (latestMessage && latestMessage.sender && latestMessage.sender !== "admin") {
    //   setListUserSendNew((listUserSendNew) => [
    //     ...listUserSendNew,
    //     latestMessage.sender
    //   ]);
    // } else if (latestMessage && latestMessage.sender && latestMessage.sender === "admin") {
    //   setIsnewMessage(true);
    // }
  }, [componentOpened, listMessage]);

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
          setListMessageN(data);
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
          <button onClick={onClose} className="btn-x">
            X
          </button>

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
                    placeholder="enter the message"
                    value={userData.content}
                    onChange={handleMessage}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    className="send-button"
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
                            className={activeIndex === item ? "active" : ""}
                            onClick={() => getChat(item)}
                          >
                            {item}
                          </button>
                          {listMessageN.includes(item) && (
                            <input type="radio"></input>
                          )}
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
                  placeholder="enter the message"
                  value={userData.content}
                  onChange={handleMessage}
                  onKeyDown={handleKeyDown}
                  readOnly={!editable}
                />
                <button
                  type="button"
                  className="send-button"
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
