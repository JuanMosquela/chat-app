import { useSelector } from "react-redux";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import { selectAuth } from "../redux/slices/auth.slice";
import { useState, useEffect } from "react";
import EmptyPicture from "./EmptyPicture";
import User from "../types/user";

const MyChats = () => {
  const { id } = useSelector(selectAuth);
  const [users, setUsers] = useState<User[]>([]);

  const { data } = useGetConversationQuery(id);

  useEffect(() => {
    if (data) {
      let usersArray: User[] = [];
      data.forEach((item: any) => {
        item.members.filter((element: User) => {
          if (element._id !== id) usersArray.push(element);
        });
      });

      setUsers(usersArray);
    }
  }, [data]);

  return (
    <div className="w-1/4">
      <ul>
        {users?.map((user) => (
          <li
            key={user._id}
            className="flex items-center gap-2   p-2 rounded-md bg-white mb-2"
          >
            {user.picture ? (
              <img
                className="rounded-full w-10"
                src={user?.picture}
                alt={user.username}
              />
            ) : (
              <EmptyPicture char={user.username[0]} />
            )}

            <h3>{user.username}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyChats;
