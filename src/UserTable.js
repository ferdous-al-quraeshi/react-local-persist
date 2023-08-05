import React, {useState} from 'react';

const UserTable = ({
  users,
  setUsers,
  setFormData,
  setIsEditing,
  setEditingUserId
 }) => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to filter by name"
        />
        <button onClick={() => setSearchTerm('')}>Clear</button>
      </div>
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
            {filteredUsers.length === 0 &&
              <tr className="NoDataRow">
                <td>No Data</td>
              </tr>
            }
            {filteredUsers.map((user) => (
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
    </>
  )

}

export default UserTable;