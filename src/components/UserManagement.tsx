// components/UserTable.js

import axios from 'axios';
import { useState, useEffect } from 'react';


const UserTable = () => {
    const [users, setUsers] = useState({
        id:"",
        username:"",
        email:"",


    });

    const fetchUsers = async () => {
        const allUsers = await axios.get('/api/users');
        setUsers(allUsers.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (userId: number) => {
        const response = await axios.delete('/api/users',)
        // Fetch users again after deletion
        fetchUsers();
    };

    return (
        <div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Edit Password</th>
                        <th className="px-4 py-2">Edit Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">Edit Password</td>
                            <td className="border px-4 py-2">Edit Role</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deleteUser(user.email)}
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
};

export default UserTable;
