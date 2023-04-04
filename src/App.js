import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    setContacts(data);
  };


  // fetch( "https://jsonplaceholder.typicode.com/users", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then(
  //     (result) => {
  //       //   console.log(result);
  //       setContacts(result.data);
  //       // setLoader("none")
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // const fetchContacts  = () => fetch
  // ('https://jsonplaceholder.typicode.com/users').then(result=>setContacts(result)).catch(err=>err);

  const addContact = async (newContact) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });
    const data = await res.json();
    setContacts([...contacts, data]);
  };

  const deleteContact = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = async (updatedContact) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    });
    const data = await res.json();
    setContacts(
      contacts.map((contact) =>
        contact.id === data.id ? { ...data } : contact
      )
    );
  };

  return (
    <div className='App'>
      <h1>Contact List</h1>
      <AddContactForm addContact={addContact} />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        updateContact={updateContact}
      />
    </div>
  );
}

export default App;
