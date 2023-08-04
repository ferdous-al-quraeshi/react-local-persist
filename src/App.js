import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the input values are empty
    if (!formData.name || !formData.email || !formData.sex) {
      alert("leave not input empty for a successful form submission!")
      return;
    }

    // Check if the email already exists (in edit mode, allow the same email for the same user being edited)
    const isDuplicateEmail = users.some(
      (user) =>
        user.email === formData.email ||
        (isEditing && user.id !== editingUserId)
    );

    if (isDuplicateEmail) {
      alert('Email already exists');
      return;
    }

    if (isEditing) {
      // Update the user data
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...formData, id: editingUserId } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setIsEditing(false);
      setEditingUserId(null);
    } else {
      // Add a new user
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
    }

    // Clear the form data after successful submission
    setFormData({ name: '', email: '', sex: '' });
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setFormData(userToEdit);
      setIsEditing(true);
      setEditingUserId(id);
    }
  };

  const handleDelete = (id) => {
    const updatedUsersAfterRemoval = users.filter((user) => user.id !== id);
    setUsers(updatedUsersAfterRemoval);
    localStorage.setItem('users', JSON.stringify(updatedUsersAfterRemoval));
  };

  return (
    <div className="App">
      <h1>Simple Form Data Persistance App
        <br />
      with React and LocalStorage</h1>
      {/* ================
        User Form
      ================ */}
      <div className="SectionContainer">
        <form className="UserForm" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Sex:
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === 'male'}
              onChange={handleChange}
            />
            Male
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* ================
        Data Table
      ================ */}
      <div className="SectionContainer">
        <table className="DataTable">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Sex</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {users.length === 0 &&
              <tr className="NoDataRow">
                <td>No Data</td>
              </tr>
            }
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.sex}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default App;
