import { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Project Review Meeting',
      date: '2023-08-15',
      time: '10:00 AM',
      participants: ['Mrhos Mkoma', 'Zakia Mfinanga']
    },
    {
      id: 2,
      title: 'Client Presentation',
      date: '2023-08-20',
      time: '2:00 PM',
      participants: ['All Team Members']
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    participants: ''
  });

  const [showEventForm, setShowEventForm] = useState(false);

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      participants: newEvent.participants.split(',')
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      participants: ''
    });
    setShowEventForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="calendar-section">
      <div className="section-inner">
        <h2 className="section-title">Team Calendar</h2>
        
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
              &lt; Prev
            </button>
            <h3>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h3>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
              Next &gt;
            </button>
          </div>
          
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            
            {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }, (_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
              const dayEvents = events.filter(event => event.date === date.toISOString().split('T')[0]);
              
              return (
                <div 
                  key={i} 
                  className={`calendar-day ${date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'today' : ''}`}
                >
                  <div className="day-number">{i + 1}</div>
                  {dayEvents.map(event => (
                    <div key={event.id} className="calendar-event">
                      <div className="event-time">{event.time}</div>
                      <div className="event-title">{event.title}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p>{event.time} • {event.participants.join(', ')}</p>
                </div>
              </div>
            ))}
        </div>
        
        <button 
          className="add-event-button"
          onClick={() => setShowEventForm(true)}
        >
          + Add New Event
        </button>
        
        {showEventForm && (
          <div className="event-form-overlay">
            <div className="event-form">
              <h3>Add New Event</h3>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Participants (comma separated)</label>
                <input
                  type="text"
                  name="participants"
                  value={newEvent.participants}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button onClick={handleAddEvent}>Add Event</button>
                <button onClick={() => setShowEventForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calendar;