import React from 'react';

const UserTable = ({
  users,
  setUsers,
  setFormData,
  setIsEditing,
  setEditingUserId
 }) => {

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
  )

}

export default UserTable;