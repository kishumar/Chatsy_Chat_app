import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUserThunk,
  logoutUserThunk,
} from "../../store/user/user.thunk";

function UserSidebar() {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
            user.fullname.toLowerCase()?.includes(searchValue.toLowerCase())
          );

           
        })
      );
    }
  },[searchValue, otherUsers]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUserThunk());
    })();
  }, []);
  return (
    <div className="max-w-[20em] w-full h-screen  flex flex-col border-r border-r-white">
      <div>
        <h1 className=" bg-black rounded-lg mt-3 px-3 py-1 text-[#7480FF] text-xl text-center font-semibold">
          
          ChatSy
        </h1>
      </div>
      <div className="p-3">
        <label className="input">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            // required
            placeholder="Search"
            className="text-[17px]"
          />
          <IoSearch className="text-[17px]" />
        </label>
      </div>

      <div className="h-full overflow-y-auto px-3 flex flex-col gap-3">
        {users?.map((userDetails) => {
          // console.log(userDetails)
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>

        <button
          className="btn btn-primary btn-sm px-4 font-medium text-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;
