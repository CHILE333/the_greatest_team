import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';

const Chat = ({ teamMembers }) => {
  const { memberId } = useParams();
  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (memberId) {
      const member = teamMembers.find(m => m.id === parseInt(memberId));
      setSelectedMember(member);
      // Load chat history for this member
      setMessages([
        {
          id: 1,
          sender: member.id,
          text: `Hi there! This is ${member.name}. How can I help you today?`,
          time: '10:30 AM'
        },
        {
          id: 2,
          sender: 0, // Current user
          text: "Hi! I wanted to discuss the project progress.",
          time: '10:32 AM'
        }
      ]);
    }
  }, [memberId, teamMembers]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 0, // Current user
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: selectedMember.id,
        text: `Thanks for your message! I'll get back to you soon about this.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <section className="chat-section">
      <div className="section-inner">
        <h2 className="section-title">Team Chat</h2>
        <div className="chat-container">
          <div className="chat-members">
            <h3>Team Members</h3>
            <ul>
              {teamMembers.map((member) => (
                <li 
                  key={member.id} 
                  className={selectedMember?.id === member.id ? 'active' : ''}
                  onClick={() => setSelectedMember(member)}
                >
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
            {selectedMember ? (
              <>
                <div className="chat-header">
                  <div 
                    className="member-avatar"
                    style={{ backgroundImage: `url(${selectedMember.image})` }}
                  ></div>
                  <div>
                    <h3>{selectedMember.name}</h3>
                    <p>{selectedMember.role}</p>
                  </div>
                </div>
                <div className="messages-container">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`message ${msg.sender === 0 ? 'sent' : 'received'}`}
                    >
                      {msg.sender !== 0 && (
                        <div 
                          className="message-avatar"
                          style={{ backgroundImage: `url(${selectedMember.image})` }}
                        ></div>
                      )}
                      <div className="message-content">
                        {msg.sender !== 0 && (
                          <div className="message-sender">{selectedMember.name}</div>
                        )}
                        <div className="message-text">{msg.text}</div>
                        <div className="message-time">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="message-input">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              </>
            ) : (
              <div className="select-member-prompt">
                <p>Select a team member to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;