import { useState } from 'react';
import './Meetings.css';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Weekly Team Sync',
      date: '2023-08-07',
      time: '10:00 AM',
      duration: '1 hour',
      organizer: 'Mrhos Mkoma',
      participants: ['All Team Members'],
      agenda: 'Project updates and task assignments'
    },
    {
      id: 2,
      title: 'Client Review',
      date: '2023-08-10',
      time: '2:00 PM',
      duration: '2 hours',
      organizer: 'Zakia Mfinanga',
      participants: ['Mrhos Mkoma', 'Davis Bubelwa', 'Clara Conrad'],
      agenda: 'Present animation progress to client'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    organizer: '',
    participants: '',
    agenda: ''
  });

  const [showMeetingForm, setShowMeetingForm] = useState(false);

  const handleAddMeeting = () => {
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      participants: newMeeting.participants.split(',')
    };
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      duration: '',
      organizer: '',
      participants: '',
      agenda: ''
    });
    setShowMeetingForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="meetings-section">
      <div className="section-inner">
        <h2 className="section-title">Team Meetings</h2>
        
        <div className="meetings-list">
          {meetings
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(meeting => (
              <div key={meeting.id} className="meeting-card">
                <div className="meeting-date">
                  {new Date(meeting.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="meeting-details">
                  <h3>{meeting.title}</h3>
                  <div className="meeting-meta">
                    <span>{meeting.time} • {meeting.duration}</span>
                    <span>Organizer: {meeting.organizer}</span>
                  </div>
                  <div className="meeting-participants">
                    <strong>Participants:</strong> {meeting.participants.join(', ')}
                  </div>
                  <div className="meeting-agenda">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </div>
                </div>
                <div className="meeting-actions">
                  <button className="join-button">Join</button>
                  <button className="details-button">Details</button>
                </div>
              </div>
            ))}
        </div>
        
        <button 
          className="add-meeting-button"
          onClick={() => setShowMeetingForm(true)}
        >
          + Schedule New Meeting
        </button>
        
        {showMeetingForm && (
          <div className="meeting-form-overlay">
            <div className="meeting-form">
              <h3>Schedule New Meeting</h3>
              <div className="form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newMeeting.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newMeeting.time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={newMeeting.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 1 hour"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={newMeeting.organizer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Participants (comma separated)</label>
                <input
                  type="text"
                  name="participants"
                  value={newMeeting.participants}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Agenda</label>
                <textarea
                  name="agenda"
                  value={newMeeting.agenda}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-actions">
                <button onClick={handleAddMeeting}>Schedule Meeting</button>
                <button onClick={() => setShowMeetingForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Meetings;