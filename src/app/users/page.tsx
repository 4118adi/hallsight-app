"use client";
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Fetch users from the API
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleRoleChange = (id: number, role: string) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [id]: role,
    }));
  };

  const handleUpdateRole = async (id: number) => {
    const role = selectedRoles[id];
    if (!role) return; // If no role selected, return early

    const res = await fetch(`/api/users`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role }),
    });
    if (res.ok) {
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, role } : user
      );
      setUsers(updatedUsers);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Change Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Update Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Delete User
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={selectedRoles[user.id] || user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="ATTENDEE">Attendee</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ORGANISER">Organiser</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdateRole(user.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
