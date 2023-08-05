import React from 'react';

import './UserForm.css';

const UserForm = ({
  users,
  setUsers,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  setEditingUserId,
  editingUserId}) => {
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

  return (
    <div className="SectionContainer">
      <form className="UserForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Full name"
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
            placeholder="Email ID"
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
  )

}

export default UserForm;
