import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";
function SendMessage() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
//   console.log(selectedUser?._id)
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage('')
  };
  return (
    <div className="w-full p-3 flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here..."
        className="input input-primary input-bordered w-full"
      />

      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-primary"
      >
        <IoIosSend />
      </button>
    </div>
  );
}

export default SendMessage;
