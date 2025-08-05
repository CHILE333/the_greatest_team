import { useState } from 'react';
import './Chat.css';
import chatIcon from './assets/images/chat.jpg';

function Chat({ teamMembers }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: teamMembers[0].name,
      senderImage: teamMembers[0].image,
      text: "Hey team! How's the animation coming along?",
      time: "10:30 AM",
      isReceived: true
    },
    {
      id: 2,
      sender: teamMembers[2].name,
      senderImage: teamMembers[2].image,
      text: "Going well! Should have the first draft by EOD.",
      time: "10:32 AM",
      isReceived: false
    },
    {
      id: 3,
      sender: teamMembers[3].name,
      senderImage: teamMembers[3].image,
      text: "Don't forget we have the client review tomorrow at 2PM",
      time: "10:35 AM",
      isReceived: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: messages.length + 1,
      sender: "You",
      senderImage: teamMembers[1].image,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isReceived: false
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-section">
      <div className="section-inner">
        <div className="chat-header">
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
          <h2 className="section-title">Team Chat</h2>
        </div>
        <div className="chat-container">
          <div className="chat-members">
            <h3>Team Members</h3>
            <ul>
              {teamMembers.map((member, i) => (
                <li key={i}>
                  <div 
                    className="member-avatar"
                    style={{ backgroundImage: `url(${member.image})` }}
                  ></div>
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-messages">
            <div className="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.isReceived ? 'received' : 'sent'}`}
                >
                  {message.isReceived && (
                    <div 
                      className="message-avatar"
                      style={{ backgroundImage: `url(${message.senderImage})` }}
                    ></div>
                  )}
                  <div className="message-content">
                    {message.isReceived && (
                      <div className="message-sender">{message.sender}</div>
                    )}
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.time}</div>
                  </div>
                  {!message.isReceived && (
                    <div 
                      className="message-avatar"
                      style={{ backgroundImage: `url(${message.senderImage})` }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;