import React, { useContext,useState } from 'react';
import { UsernameContext } from '../Context/UsernameContext';
import { stompClient} from '../Constants/StompClient';

const ChatWindow = ({ selectedFriend, messages, handleBack }) => {

  const usercontext= useContext(UsernameContext)
  const [draftMessage,setDraftMessage]=useState('draft');
  const sendMessage= () =>{
    // console.log(selectedFriend + draftMessage)
    var user=usercontext.username
    const userObject = {
      senderId: user,
      receiverId: selectedFriend,
      content: draftMessage,

  };

  stompClient.send(
      `/app/chat`,
      JSON.stringify(userObject),
      {});
      console.log(userObject)
  }
  return (
    <>
      <div className="bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold p-4">{selectedFriend}</h2>
        <div className="p-4 h-80 overflow-y-auto">
          {messages.map((message) => (
            
            (
              <div
                key={message.id}
                className={message.senderId === 'You' ? 'flex items-end justify-end' : 'flex items-start'}
              >
                <div
                  className={message.senderId === 'You' ? 'bg-blborder-black text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500">{`${message.senderId}, ${message.timeStamp}`}</p>
                </div>
              </div>
            )
          ))}
        </div>
        <div className=' flex'>
          <button className=" px-4 py-2 m-4 mx-2  bg-blue-500 text-white rounded-md " onClick={handleBack}>
            Back
          </button>
          <div className='m-2 p-2'>
                <input
                  value={draftMessage}
                  onChange={(e) => setDraftMessage(e.target.value)}
                  autoComplete="off"
                  id="Nickname"
                  name="Nickname"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border border-gray-400 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Nickname"
                />
                <label
                  htmlFor="Nickname"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Nickname
                </label>
          </div>
          <button className=" px-4 py-2 m-4 mx-2  bg-blue-500 text-white rounded-md " onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
