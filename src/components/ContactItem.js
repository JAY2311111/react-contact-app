import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const ContactItem = ({ contact, deleteContact, updateContact }) => {
  const [editing, setEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedContact({ ...updatedContact, [name]: value });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setUpdatedContact(contact);
  };

  const handleSaveClick = () => {
    updateContact(updatedContact);
    setEditing(false);
  };

  const handleDeleteClick = () => {
    deleteContact(contact.id);
  };

  return (
    <div className="contact-item">
      <div className="contact-info">
        {editing ? (
          <div   className="contact-inputs">
            <input
              type="text"
              name="name"
              value={updatedContact.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={updatedContact.email}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="contact-text">
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
        )}
      </div>
      <div className="contact-actions">
        {editing ? (
          <div  className="editing-actions">
            <button className="save-btn" onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="cancel-btn" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ) : (
          <div className="normal-actions">
            <button className="edit-btn" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
