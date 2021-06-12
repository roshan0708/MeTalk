import React, { useState } from "react";
import mime from "mime";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ modal, closeModal, uploadFile }) => {
  const [file, setFile] = useState(null);
  const authorized = ["image/jpeg", "image/png"];

  const addFile = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setFile(imageFile);
    }
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metaData = { contentType: mime.getType(file.name) };
        uploadFile(file, metaData);
        closeModal();
        clearFile();
      }
    }
  };

  const clearFile = () => setFile(null);

  const isAuthorized = (filename) => authorized.includes(mime.getType(filename));

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          onChange={addFile}
          label="File type jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
