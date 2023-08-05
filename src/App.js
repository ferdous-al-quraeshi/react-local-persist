import React, { useState } from 'react';

import UserForm from './components/UserForm/UserForm';
import UserTable from './components/UserTable/UserTable';

import './App.css';


const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sex: '',
  });

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  return (
    <div className="App">
      <h1>Simple Form Data Persistance App
        <br />
      with React and LocalStorage</h1>
      <UserForm
        users={users}
        setUsers={setUsers}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingUserId={editingUserId}
        setEditingUserId={setEditingUserId} />
      <UserTable
        users={users}
        setUsers={setUsers}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
        setEditingUserId={setEditingUserId} />
    </div>
  )

}

export default App;
