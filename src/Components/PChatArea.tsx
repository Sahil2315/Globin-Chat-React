import { useRef, useState, useEffect } from "react";
import sendLogo from "../assets/sendLogo.svg";
import { KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { insertPChat } from "./slices/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const PChatArea = ({
  currPersonal,
  currChat,
}: {
  currPersonal: number;
  currChat: string;
}) => {
  let thisChat = useSelector((state: RootState) => state.trialUser.value).DMs[
    currPersonal
  ];
  let lastSender = useRef<number>(-1);
  lastSender.current = -1;
  let lastDate = useRef<string>("");
  lastDate.current = "";
  let today = new Date();
  let todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  let [newMessage, resetNewMsg] = useState("");
  let dispatch = useDispatch();
  let endOfMessageList = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Scroll to the last item whenever the list updates
    if (endOfMessageList.current) {
      endOfMessageList.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [thisChat]);

  let sendMessage = () => {
    if (newMessage && newMessage != "\n") {    
      let nowTime = `${String(today.getHours()).padStart(2, "0")}:${String(
        today.getMinutes()
      ).padStart(2, "0")}`;
      dispatch(
        insertPChat({
          msgid: (thisChat?.messages.length as number) + 1,
          sendid: 0,
          recid: thisChat?.uid as number,
          date: todayString,
          timing: nowTime,
          content: newMessage,
        })
      );
      resetNewMsg("");
      console.log(thisChat);
    }
  };
  let inputEnterCheck = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div
      className={
        currChat == "personal"
          ? `h-full flex flex-col ml-3 rounded-lg`
          : "hidden"
      }
    >
      {/* Messages */}
      <div className="flex flex-col h-full">
        <div className="bg-slate-600/25 flex flex-row w-max items-center rounded-t-lg px-4">
          <img
            className="h-[32px] w-[32px] rounded-xl mr-4"
            src={thisChat?.img}
          />
          <span>{thisChat?.uname}</span>
        </div>
        <div className="bg-slate-600/15 flex-1 overflow-auto flex flex-col px-2 py-2 rounded-r-lg rounded-b-lg mr-2 mb-2">
          <div className="flex flex-col flex-1 justify-end">
            {thisChat?.messages.map((message, index) => {
              let isLastSender = message.sendid == lastSender.current;
              lastSender.current = message.sendid;
              let dateAlreadyHere = message.date == lastDate.current;
              lastDate.current = message.date;
              let dateToDisplay = message.date;
              if (!dateAlreadyHere && message.date == todayString) {
                dateToDisplay = "Today";
              }
              return (
                <div key={index} className="flex flex-col w-full">
                  <div
                    className={dateAlreadyHere ? "hidden" : "my-6 w-full flex"}
                  >
                    <span className="text-white/60 text-center w-full font-bold">
                      {dateToDisplay}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col w-[85%] ${
                      isLastSender || !dateAlreadyHere ? "" : "mt-4"
                    } ${message.sendid == 0 ? "self-end" : ""}`}
                  >
                    <div
                      className={
                        isLastSender || message.sendid == 0
                          ? "hidden"
                          : "flex flex-row items-center mb-2 ml-1"
                      }
                    >
                      <img
                        className="h-[30px] w-[30px] rounded-xl mr-2"
                        src={thisChat?.img}
                      />
                      <span>{thisChat.uname}</span>
                    </div>
                    <div
                      className={`mt-[3px] rounded-md text-md px-2 py-1 relative whitespace-pre-line ${
                        message.sendid == 0
                          ? "bg-indigo-700/50"
                          : "bg-zinc-700/50"
                      }`}
                    >
                      <span>{message.content}</span>
                      <span className="absolute right-2 text-white/35 text-sm top-[6px] font-bold">
                        {message.timing}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endOfMessageList} />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex-1 flex">
            <textarea
              rows={1}
              placeholder={`Message @${thisChat.uname}`}
              value={newMessage}
              onKeyUp={(e) => inputEnterCheck(e)}
              onChange={(e) => {
                resetNewMsg(e.target.value);
              }}
              className="w-full px-2 mr-2 py-2 rounded-lg bg-slate-700/40 outline-none"
              name=""
              id=""
            />
          </div>
          <button
            onClick={sendMessage}
            className="px-2 py-1 rounded-lg mr-2 bg-indigo-700/55 h-max hover:bg-indigo-700"
          >
            <img src={sendLogo} className="h-[35px]" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PChatArea;
