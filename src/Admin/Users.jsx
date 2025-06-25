import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCard from './AdminComponents/UserCard';

function Users() {
  const [users, setUsers] = useState([]);
  const [blockedUsers,setBlockedUsers]=useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get(`http://localhost:3031/users`);
      setBlockedUsers(res.data.filter(item=>item.block==true));
      setUsers(res.data.filter(item=>item.block==false));
    };
    fetchUsers();
  }, [users]); 

  return (
    <div className="container">
      <h2 className="my-4">User List</h2>
      <div className="row">
        {users.length===0?<div className="alert alert-warning text-center" role="alert"><h2>No registered users</h2></div>
             :users.map((item) => (
          <UserCard item={item} key={item.id}/>
        ))}
      </div>
       <div className="row">
        <h1>Blocked users</h1>
        {blockedUsers.length===0?<div className="alert alert-warning text-center" role="alert"><h2>No blocked users yet</h2></div>
             :blockedUsers.map((item) => (
          <UserCard item={item} key={item.id}/>
        ))}
      </div>
    </div>
  );
}

export default Users;
