import React, { useState, useEffect } from 'react';
import useWebStore from '../../store/web-store';
import axios from 'axios';
import { toast } from 'react-toastify';

const TableUsers = () => {
  const token = useWebStore((state) => state.token);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeUserRole = async (userId, role) => {
    try {
      await axios.post(
        'http://localhost:5000/api/change-role',
        { id: userId, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Role updated!');
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update role');
    }
  };

  return (
    <div className='container mt-auto p-4 bg-white rounded shadow'>
      <h1>User Management</h1>
      <table className='table mt-4'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Addresses</th>
            <th>Adoptions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.phone || '-'}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleChangeUserRole(user.user_id, e.target.value)
                  }
                >
                  <option value='user'>user</option>
                  <option value='admin'>admin</option>
                </select>
              </td>
              <td>
                {user.addresses?.length
                  ? user.addresses
                      .map((a) => `${a.street || ''}, ${a.city || ''}, ${a.country || ''}`)
                      .join(' | ')
                  : '-'}
              </td>
              <td>
                {user.adoptions?.length
                  ? user.adoptions
                      .map((adopt) => `${adopt.cat?.name || 'Unknown'} (${adopt.status})`)
                      .join(' | ')
                  : '-'}
              </td>
              <td>
                {/* ถ้าอยากมีปุ่มจัดการเพิ่มเติมสามารถใส่ตรงนี้ */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
