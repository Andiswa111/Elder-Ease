import { useState } from 'react';
import './App.css';

function App() {
  const [activeFeature, setActiveFeature] = useState('home');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Scam Warning',
      message: 'Be careful of messages asking for your banking information.',
      date: 'Today',
      read: false,
    },
    {
      id: 2,
      title: 'Safety Reminder',
      message: 'Never share your PIN, password or OTP with anyone.',
      date: 'Today',
      read: false,
    },
  ]);
  return (
    <div className="app">
      <header className="header">
        <h1>Elder Ease</h1>
        <p>Your simple guide to staying safe from scams.</p>
      </header>

      <main className="main">
        {/* HOME */}
        {activeFeature === 'home' && (
          <>
            <section className="welcome">
              <h2>Welcome to Elder Ease</h2>
              <p>
                Learn about scams, check suspicious messages, get help and stay
                safe online.
              </p>
            </section>

            <div className="buttons">
              <button onClick={() => setActiveFeature('scams')}>
                🛡️
                <strong>Scam Awareness</strong>
                <span>Learn about common scams</span>
              </button>

              <button onClick={() => setActiveFeature('checker')}>
                🔍
                <strong>Is This a Scam?</strong>
                <span>Check a suspicious message</span>
              </button>

              <button onClick={() => setActiveFeature('help')}>
                🚨
                <strong>Get Help</strong>
                <span>Emergency and trusted contacts</span>
              </button>

              <button onClick={() => setActiveFeature('voice')}>
                🎙️
                <strong>Voice Help</strong>
                <span>Speak instead of typing</span>
              </button>

              <button onClick={() => setActiveFeature('alerts')}>
                📰
                <strong>Scam Alerts</strong>
                <span>See important scam warnings</span>
              </button>

              <button onClick={() => setActiveFeature('notifications')}>
                🔔
                <strong>Notifications</strong>
                <span>View safety reminders</span>
              </button>
              <button onClick={() => setActiveFeature('community')}>
                👥
                <strong>Community Support</strong>
                <span>Find people and services that can help</span>
              </button>
            </div>
          </>
        )}

        {activeFeature === 'scams' && <ScamAwareness />}

        {activeFeature === 'checker' && <ScamChecker />}

        {activeFeature === 'help' && <EmergencyHelp />}

        {activeFeature === 'voice' && (
          <VoiceHelp setActiveFeature={setActiveFeature} />
        )}

        {activeFeature === 'alerts' && (
          <ScamAlerts
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}

        {activeFeature === 'notifications' && (
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}

        {activeFeature === 'community' && <CommunitySupport />}

        {activeFeature !== 'home' && (
          <button
            className="back-button"
            onClick={() => setActiveFeature('home')}
          >
            ← Back to Home
          </button>
        )}
      </main>

      <footer className="footer">
        <p>Elder Ease • Stay Alert. Stay Safe.</p>
      </footer>
    </div>
  );
}

/* =========================
   SCAM AWARENESS
========================= */

function ScamAwareness() {
  return (
    <section className="page">
      <h2>🛡️ Scam Awareness</h2>

      <p>Learn about common scams and how to protect yourself.</p>

      <div className="info-card">
        <h3>🏦 Banking Scams</h3>
        <p>
          Someone may pretend to be from your bank and ask for your PIN,
          password or OTP.
        </p>
      </div>

      <div className="info-card">
        <h3>📱 WhatsApp Scams</h3>
        <p>
          Someone may pretend to be a family member and ask you to send money.
        </p>
      </div>

      <div className="info-card">
        <h3>🎁 Prize Scams</h3>
        <p>You may receive a message saying you have won money or a prize.</p>
      </div>

      <div className="info-card">
        <h3>🔗 Phishing Scams</h3>
        <p>
          A message may ask you to click a suspicious link or provide personal
          information.
        </p>
      </div>

      <div className="warning">
        <h3>⚠️ Remember</h3>
        <p>
          <strong>Never share your PIN, password or OTP with anyone.</strong>
        </p>
      </div>
    </section>
  );
}

/* =========================
   SCAM CHECKER
========================= */

function ScamChecker() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const checkScam = () => {
    if (!message.trim()) {
      setResult({ type: 'empty' });
      return;
    }

    const text = message.toLowerCase();

    const warningWords = [
      'otp',
      'pin',
      'password',
      'send money',
      'transfer money',
      'urgent',
      'immediately',
      'you won',
      'prize',
      'click here',
      'bank details',
    ];

    const foundWarnings = warningWords.filter((word) => text.includes(word));

    if (foundWarnings.length >= 3) {
      setResult('high');
    } else if (foundWarnings.length >= 1) {
      setResult('medium');
    } else {
      setResult('low');
    }
  };

  return (
    <section className="page">
      <h2>🔍 Is This a Scam?</h2>

      <p>
        Paste a suspicious message below and Elder Ease will look for common
        warning signs.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste suspicious message here..."
      />

      <button className="primary-button" onClick={checkScam}>
        🔍 CHECK MESSAGE
      </button>

      {result === 'empty' && (
        <div className="result-box">
          <h2>Please enter a message</h2>
        </div>
      )}

      {result === 'high' && (
        <div className="result-box">
          <h2>⚠️ HIGH RISK OF A SCAM</h2>
          <p>This message contains several common scam warning signs.</p>
          <strong>
            Do not reply, click links, send money or share your PIN/OTP.
          </strong>
        </div>
      )}

      {result === 'medium' && (
        <div className="result-box">
          <h2>⚠️ BE CAREFUL</h2>
          <p>This message contains possible scam warning signs.</p>
        </div>
      )}

      {result === 'low' && (
        <div className="result-box">
          <h2>✓ NO OBVIOUS WARNING SIGNS</h2>
          <p>We did not find obvious scam warning signs.</p>
          <strong>This does not guarantee that the message is safe.</strong>
        </div>
      )}
    </section>
  );
}

/* =========================
   EMERGENCY HELP
========================= */

function EmergencyHelp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('elderEaseContacts');
    return saved ? JSON.parse(saved) : [];
  });

  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please enter both a name and phone number.');
      return;
    }

    const newContact = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);

    localStorage.setItem('elderEaseContacts', JSON.stringify(updatedContacts));

    setName('');
    setPhone('');

    alert('Trusted contact added successfully.');
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(updatedContacts);

    localStorage.setItem('elderEaseContacts', JSON.stringify(updatedContacts));
  };

  const callContact = (phone, name) => {
    const confirmed = window.confirm(`Are you sure you want to call ${name}?`);

    if (confirmed) {
      window.location.href = `tel:${phone}`;
    }
  };

  const callEmergency = () => {
    const confirmed = window.confirm(
      'Are you sure you want to call Emergency Services?'
    );

    if (confirmed) {
      window.location.href = 'tel:112';
    }
  };

  return (
    <section className="page">
      <h2>🚨 Get Help</h2>

      <p>
        If you think you are being scammed, stay calm. You do not have to deal
        with it alone.
      </p>

      <div className="emergency-warning">
        <h3>⚠️ FIRST — STAY SAFE</h3>

        <p>Do not send money.</p>

        <p>Do not share your PIN, password or OTP.</p>

        <p>Do not click suspicious links.</p>

        <p>Speak to someone you trust.</p>
      </div>

      {/* EMERGENCY SERVICES */}

      <button className="help-button" onClick={callEmergency}>
        🚨
        <strong>EMERGENCY SERVICES</strong>
        <span>Call 112 for urgent assistance</span>
      </button>

      {/* TRUSTED CONTACTS */}

      <h2>👨‍👩‍👧 Trusted Contacts</h2>

      <p>
        Add someone you trust, such as a family member, caregiver or friend.
      </p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="primary-button" onClick={addContact}>
        + ADD TRUSTED CONTACT
      </button>

      {/* SAVED CONTACTS */}

      {contacts.length > 0 && (
        <div>
          <h3>My Trusted Contacts</h3>

          {contacts.map((contact) => (
            <div className="contact-card" key={contact.id}>
              <div>
                <strong>{contact.name}</strong>

                <p>{contact.phone}</p>
              </div>

              <div>
                <button
                  onClick={() => callContact(contact.phone, contact.name)}
                >
                  📞 CALL
                </button>

                <button onClick={() => deleteContact(contact.id)}>
                  🗑️ DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BANK HELP */}

      <h2>🏦 Bank Help</h2>

      <div className="info-card">
        <h3>Think someone is pretending to be your bank?</h3>

        <p>Do not use the phone number in the suspicious message.</p>

        <p>
          Instead, use the official number on your bank card or official bank
          website.
        </p>
      </div>

      {/* FINAL REMINDER */}

      <div className="warning">
        <h3>❤️ You Are Not Alone</h3>

        <p>
          If you are unsure about something, stop and speak to a trusted person
          before taking action.
        </p>
      </div>
    </section>
  );
}
/* =========================
   VOICE HELP
========================= */

function VoiceHelp({ setActiveFeature }) {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('Tap the button and speak.');

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage('Voice recognition is not supported by this browser.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-ZA';

    recognition.continuous = false;

    recognition.interimResults = false;

    setListening(true);

    setMessage('🎙️ Listening...');

    recognition.start();

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript.toLowerCase();

      setListening(false);

      if (speech.includes('scam')) {
        setMessage('Opening Scam Awareness...');

        setTimeout(() => {
          setActiveFeature('scams');
        }, 800);
      } else if (speech.includes('check') || speech.includes('message')) {
        setMessage('Opening Scam Checker...');

        setTimeout(() => {
          setActiveFeature('checker');
        }, 800);
      } else if (speech.includes('help') || speech.includes('emergency')) {
        setMessage('Opening Emergency Help...');

        setTimeout(() => {
          setActiveFeature('help');
        }, 800);
      } else if (speech.includes('alert')) {
        setMessage('Opening Scam Alerts...');

        setTimeout(() => {
          setActiveFeature('alerts');
        }, 800);
      } else {
        setMessage(
          'Try saying: Show me scams, check a message, or I need help.'
        );
      }
    };

    recognition.onerror = () => {
      setListening(false);

      setMessage('Sorry, I could not hear you. Please try again.');
    };
  };

  return (
    <section className="page">
      <h2>🎙️ Voice Help</h2>

      <p>Speak to Elder Ease instead of typing.</p>

      <button
        className="voice-button"
        onClick={startVoice}
        disabled={listening}
      >
        {listening ? '🎙️ LISTENING...' : '🎙️ TAP TO SPEAK'}
      </button>

      <div className="voice-message">
        <h3>Try saying:</h3>

        <ul>
          <li>"Show me scams"</li>
          <li>"Check a message"</li>
          <li>"I need help"</li>
          <li>"Show alerts"</li>
        </ul>
      </div>

      <div className="voice-status">
        <h3>Voice Assistant</h3>

        <p>{message}</p>
      </div>
    </section>
  );
  function VoiceHelp({ setActiveFeature }) {
    const [listening, setListening] = useState(false);
    const [message, setMessage] = useState(
      'Tap the button and tell Elder Ease what you need.'
    );

    const startVoice = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setMessage(
          'Voice help is not supported by this browser. Please use the buttons instead.'
        );
        return;
      }

      const recognition = new SpeechRecognition();

      recognition.lang = 'en-ZA';
      recognition.continuous = false;
      recognition.interimResults = false;

      setListening(true);
      setMessage('🎙️ Listening... Please speak now.');

      recognition.start();

      recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript.toLowerCase();

        setListening(false);

        setMessage(`You said: "${speech}"`);

        /* SCAM AWARENESS */

        if (
          speech.includes('scam') ||
          speech.includes('scams') ||
          speech.includes('safety')
        ) {
          setMessage('Opening Scam Awareness...');

          setTimeout(() => {
            setActiveFeature('scams');
          }, 1000);
        } else if (
          /* SCAM CHECKER */
          speech.includes('check') ||
          speech.includes('check a message') ||
          speech.includes('suspicious message')
        ) {
          setMessage('Opening the Scam Checker...');

          setTimeout(() => {
            setActiveFeature('checker');
          }, 1000);
        } else if (
          /* EMERGENCY HELP */
          speech.includes('help') ||
          speech.includes('emergency') ||
          speech.includes('i need help')
        ) {
          setMessage('Opening Emergency Help...');

          setTimeout(() => {
            setActiveFeature('help');
          }, 1000);
        } else if (
          /* SCAM ALERTS */
          speech.includes('alert') ||
          speech.includes('alerts') ||
          speech.includes('warnings')
        ) {
          setMessage('Opening Scam Alerts...');

          setTimeout(() => {
            setActiveFeature('alerts');
          }, 1000);
        } else if (
          /* NOTIFICATIONS */
          speech.includes('notification') ||
          speech.includes('notifications')
        ) {
          setMessage('Opening Notifications...');

          setTimeout(() => {
            setActiveFeature('notifications');
          }, 1000);
        } else if (
          /* COMMUNITY */
          speech.includes('community') ||
          speech.includes('support') ||
          speech.includes('contacts')
        ) {
          setMessage('Opening Community Support...');

          setTimeout(() => {
            setActiveFeature('community');
          }, 1000);
        } else {
          /* DID NOT UNDERSTAND */
          setMessage(
            "I did not understand. Try saying: 'Show me scams', 'Check a message', 'I need help', 'Show alerts', or 'Community support'."
          );
        }
      };

      recognition.onerror = () => {
        setListening(false);

        setMessage('Sorry, I could not hear you. Please try again.');
      };

      recognition.onend = () => {
        setListening(false);
      };
    };

    return (
      <section className="page">
        <h2>🎙️ Voice Help</h2>

        <p>Speak to Elder Ease instead of typing.</p>

        <button
          className="voice-button"
          onClick={startVoice}
          disabled={listening}
        >
          {listening ? '🎙️ LISTENING...' : '🎙️ TAP TO SPEAK'}
        </button>

        <div className="voice-message">
          <h3>What can I say?</h3>

          <p>Try saying:</p>

          <ul>
            <li>"Show me scams"</li>
            <li>"Check a message"</li>
            <li>"I need help"</li>
            <li>"Show alerts"</li>
            <li>"Show notifications"</li>
            <li>"Community support"</li>
          </ul>
        </div>

        <div className="voice-status">
          <h3>Voice Assistant</h3>

          <p>{message}</p>
        </div>

        <p>
          You can always use the normal buttons if you prefer not to use voice.
        </p>
      </section>
    );
  }
}

/* =========================
   SCAM ALERTS
========================= */

function ScamAlerts({ notifications, setNotifications }) {
  const alerts = [
    {
      title: 'BANKING SCAM',
      message:
        'Someone may pretend to be from your bank and ask for your OTP or PIN.',
      advice: 'Never share your OTP, PIN or password.',
    },
    {
      title: 'WHATSAPP SCAM',
      message: 'Someone may pretend to be a family member and ask for money.',
      advice: 'Call the family member directly to check.',
    },
    {
      title: 'FAKE PRIZE SCAM',
      message: 'You may receive a message saying you won money or a prize.',
      advice: 'Never pay money to claim a prize.',
    },
    {
      title: 'PHISHING SCAM',
      message: 'A message may ask you to click a suspicious link.',
      advice: 'Do not click suspicious links.',
    },
  ];

  const addNotification = (scamAlert) => {
    const alreadyAdded = notifications.some(
      (notification) => notification.title === alert.title
    );

    if (alreadyAdded) {
      alert('This scam alert is already in your notifications.');
      return;
    }

    const newNotification = {
      id: Date.now(),
      title: alert.title,
      message: alert.advice,
      date: 'Just now',
      read: false,
    };

    setNotifications([...notifications, newNotification]);

    alert('Scam alert added to your notifications.');
  };

  return (
    <section className="page">
      <h2>📰 Scam Alerts</h2>

      <p>Important warnings to help you stay safe from scams.</p>

      {alerts.map((alert, index) => (
        <div className="alert-card" key={index}>
          <h3>⚠️ {alert.title}</h3>

          <p>
            <strong>What to look out for:</strong>
          </p>

          <p>{alert.message}</p>

          <div className="alert-advice">
            <p>
              <strong>Remember:</strong>
            </p>

            <p>{alert.advice}</p>
          </div>

          <button
            className="primary-button"
            onClick={() => addNotification(alert)}
          >
            🔔 SAVE AS NOTIFICATION
          </button>
        </div>
      ))}
    </section>
  );
}

/* =========================
   NOTIFICATIONS
========================= */

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Scam Warning',
      message: 'Be careful of messages asking for your banking information.',
      date: 'Today',
      read: false,
    },
    {
      id: 2,
      title: 'Safety Reminder',
      message: 'Never share your PIN, password or OTP with anyone.',
      date: 'Today',
      read: false,
    },
    {
      id: 3,
      title: 'WhatsApp Safety',
      message:
        'If someone asks for money on WhatsApp, call them directly to check.',
      date: 'Yesterday',
      read: false,
    },
    {
      id: 4,
      title: 'Link Safety',
      message:
        'Do not click links in unexpected messages. Contact the organisation directly.',
      date: 'Yesterday',
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <section className="page">
      <h2>🔔 Notifications</h2>

      <p>Important safety reminders and scam warnings.</p>

      {/* UNREAD COUNT */}

      <div className="notification-count">
        {unreadCount === 0
          ? '✓ You have no unread notifications.'
          : `⚠️ You have ${unreadCount} unread notification${
              unreadCount === 1 ? '' : 's'
            }.`}
      </div>

      {/* MARK ALL AS READ */}

      {unreadCount > 0 && (
        <button className="primary-button" onClick={markAllAsRead}>
          ✓ MARK ALL AS READ
        </button>
      )}

      {/* NOTIFICATIONS */}

      {notifications.length === 0 ? (
        <div className="info-card">
          <h3>✓ All Clear</h3>

          <p>You have no notifications at the moment.</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div className="notification-card" key={notification.id}>
            <div className="notification-icon">
              {notification.read ? '✓' : '⚠️'}
            </div>

            <div>
              <h3>{notification.title}</h3>

              <p>{notification.message}</p>

              <p>
                <strong>{notification.date}</strong>
              </p>

              {/* MARK AS READ */}

              {!notification.read && (
                <button
                  className="read-button"
                  onClick={() => markAsRead(notification.id)}
                >
                  ✓ MARK AS READ
                </button>
              )}

              {/* DELETE */}

              <button
                className="read-button"
                onClick={() => deleteNotification(notification.id)}
              >
                🗑️ DELETE
              </button>
            </div>
          </div>
        ))
      )}

      {/* SAFETY TIP */}

      <div className="warning">
        <h3>🛡️ Safety Tip</h3>

        <p>When you receive a suspicious message, stop before taking action.</p>

        <p>Ask someone you trust if you are unsure.</p>
      </div>
    </section>
  );
}
function CommunitySupport() {
  const resources = [
    {
      icon: '👨‍👩‍👧',
      title: 'Family & Caregivers',
      description:
        'Speak to someone you trust if you are unsure about a message or phone call.',
    },
    {
      icon: '🏦',
      title: 'Your Bank',
      description:
        'Contact your bank using the official number on your bank card or official website.',
    },
    {
      icon: '👮',
      title: 'Police',
      description:
        'If you have been the victim of a scam, report it to the police.',
    },
    {
      icon: '🏥',
      title: 'Health Services',
      description:
        'Contact a healthcare professional if you need medical assistance.',
    },
    {
      icon: '🛡️',
      title: 'Scam Support',
      description:
        'Ask someone you trust for help before sending money or sharing personal information.',
    },
  ];

  return (
    <section className="page">
      <h2>👥 Community Support</h2>

      <p>
        You do not have to deal with a scam alone. These people and services can
        help you.
      </p>

      {resources.map((resource, index) => (
        <div className="info-card" key={index}>
          <h3>
            {resource.icon} {resource.title}
          </h3>

          <p>{resource.description}</p>
        </div>
      ))}

      <div className="warning">
        <h3>⚠️ Remember</h3>

        <p>
          If you are unsure about a message, phone call or request for money,
          stop and speak to someone you trust.
        </p>
      </div>
    </section>
  );
}

export default App;
