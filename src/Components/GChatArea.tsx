import { useEffect, useRef, useState, KeyboardEvent } from "react"
import sendLogo from "../assets/sendLogo.svg"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import { insertGChat } from "./slices/chatSlice"


const GChatArea = ({currGroup, currChat}: {currGroup: number, currChat: string}) => {
  const thisChat = useSelector((state: RootState) => state.trialUser.value).groups[currGroup]
  let lastSender = useRef<number>(-1)
    lastSender.current = -1
    let lastDate = useRef<string>("")
    lastDate.current = ""
    let today = new Date()
    let todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    let [newMessage, resetNewMsg] = useState("");
    let dispatch = useDispatch();
    let endOfMessageList = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      if (endOfMessageList.current){
        endOfMessageList.current.scrollIntoView();
      }
    }, [thisChat])
    let sendMessage = () => {
      if (newMessage && newMessage != "\n") {
        let nowTime = `${String(today.getHours()).padStart(2, "0")}:${String(
          today.getMinutes()
        ).padStart(2, "0")}`;
        dispatch(insertGChat({
          memberid: 0,
          gmsgid: thisChat.messages.length + 1,
          cont: newMessage,
          time: nowTime,
          date: todayString
        }))
        resetNewMsg("");
      }
    }
    let inputEnterCheck = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };
    return (
      <div
        className={
          currChat == "group"
            ? `h-full flex flex-col ml-3 rounded-lg`
            : "hidden"
        }
      >
        {/* Messages */}
        <div className="flex flex-col h-full">
          <div className="bg-slate-600/15 flex flex-row w-max items-center rounded-t-lg px-4 py-1">
            <img className="h-[32px] w-[32px] rounded-xl mr-4" src={thisChat?.grplogo} />
            <span>{thisChat?.grpname}</span>
          </div>
          <div className="bg-slate-600/15 h-full overflow-y-auto flex px-2 py-4 rounded-r-lg rounded-b-lg flex-col justify-end mr-4 mb-2">
            {thisChat?.messages.map((message, index) => {
              let isLastSender = message.memberid == lastSender.current
              lastSender.current = message.memberid
              let dateAlreadyHere = message.date == lastDate.current
              lastDate.current = message.date
              let dateToDisplay = message.date
              if (!dateAlreadyHere && message.date == todayString){
                dateToDisplay = "Today"
              }
              return (
                <div key={index} className="flex flex-col w-full">
                  <div className={dateAlreadyHere ? 'hidden': 'my-6 w-full flex'}>
                    <span className="text-white/60 text-center w-full font-bold">{dateToDisplay}</span>
                  </div>
                  <div key={index} className={`flex flex-col w-[85%] ${isLastSender || !dateAlreadyHere ? "" : "mt-4"} ${message.memberid == 0 ? "self-end": ""}`}>
                    <div className={isLastSender || message.memberid == 0 ? "hidden": "flex flex-row items-center mb-2 ml-1"}>
                      <img className="h-[30px] w-[30px] rounded-xl mr-2" src={thisChat.members[message.memberid].img} />
                      <span>{thisChat.members[message.memberid].uname}</span>
                    </div>
                    <div className={`mt-[3px] text-md py-1 rounded-md px-2 relative ${(message.memberid == 0 ? "bg-indigo-700/50": "bg-zinc-700/50")}` }>
                      <span>{message.cont}</span>
                      <span className="absolute right-2 text-white/35 text-sm top-[6px] font-bold">{message.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endOfMessageList} />
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex flex-row">
              <textarea rows={1} value={newMessage}
              onKeyUp={(e) => inputEnterCheck(e)}
              onChange={(e) => { resetNewMsg(e.target.value);}} placeholder={`Message to ${thisChat.grpname}`} className="w-full px-2 pt-2 mr-2 rounded-lg bg-slate-700/40 outline-none" />
            </div>
            <button onClick={sendMessage} className="px-2 py-1 rounded-lg mr-4 bg-indigo-700/55 hover:bg-indigo-700">
              <img src={sendLogo} className="h-[35px]" alt="Send"/>
            </button>
          </div>
        </div>
      </div>
    );
}

export default GChatArea