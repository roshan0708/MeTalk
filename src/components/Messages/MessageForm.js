import React, { useState } from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {
  const [messageData, setMessageData] = useState({
    message: "",
    loading: false,
    errors: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData({ ...messageData, [name]: value });
  };

  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      content: messageData.message,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };

    return message;
  };

  const sendMessage = () => {
    const { message } = messageData;
    if (message) {
      setMessageData({ ...messageData, loading: true });
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setMessageData({
            ...messageData,
            loading: false,
            message: "",
            errors: [],
          });
        })
        .catch((err) => {
          console.error(err);

          setMessageData({
            ...messageData,
            loading: false,
            errors: messageData.errors.concat(err),
          });
        });
    } else {
      setMessageData({
        ...messageData,
        errors: messageData.errors.concat({ message: "Add a message" }),
      });
    }
  };
  return (
    <Segment className="messag__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        value={messageData.message}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write your message"
        className={
          messageData.errors.some((error) => error.message.includes("message"))
            ? "error"
            : ""
        }
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          disabled={messageData.loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
