import React, { useContext } from "react";
import { UserConsumer } from "./UserContext";
import { EmailContext } from "./EmailContext";


const MessageList = () => {
  const {loading, emails, onSelectEmail} = useContext(EmailContext);

  return (
    <UserConsumer>
      {({ user }) => (
            <div className="MessageList">
              {loading ? (
                <div className="no-messages">loading</div>
                ): EmailContext.length === 0 ? (
                    <div className="no-messages">
                      Your mailbox is empty, {user.firstName}! 🎉
                    </div>
                ) : (
                  <ul>
                    {emails.map(email => (
                      <Email key={email.id}
                      email={email}
                      onClick={() => onSelectEmail(email)} />
                    ))}
                  </ul>
                )}
            </div>
      )}
    </UserConsumer>
  )
}

const Email = ({ email, onClick }) => (
  <li onClick={onClick}>
    <div className="subject">{email.subject}</div>
    <div className="preview">{email.preview}</div>
  </li>
)

export default MessageList;
