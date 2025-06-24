import React, { useState, useEffect } from 'react';
import { allUsers, getProfile } from "../services/api";
import ChatBox from "./ChatBox";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersRes, profileRes] = await Promise.all([
          allUsers(),
          getProfile()
        ]);
console.log(usersRes.data.users, "me is:",profileRes.data.user)
        setUsers(usersRes.data.users);
        setCurrentUser(profileRes.data.user);
      } catch (err) {
        console.error("Failed to fetch users or profile", err);
      }
    };

    fetchUsers();
  }, []);

  const generateRoomId = (id1, id2) => {
    // Always return same roomId for the same user pair
    return [id1, id2].sort().join("-");
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {!selectedUser && (
        <ul className="space-y-2">
          {users
            .filter((user) => user._id !== currentUser?._id)
            .map((user) => (
              <li
                key={user._id}
                className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                {user.email}
              </li>
            ))}
        </ul>
      )}

      {selectedUser && currentUser && (
        <ChatBox
          roomId={generateRoomId(currentUser._id, selectedUser._id)}
          currentUserId={currentUser._id}
          receiverId={selectedUser._id}
        />
      )}
    </div>
  );
};

export default AllUsers;
