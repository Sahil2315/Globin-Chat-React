import { useSelector } from "react-redux"
import { pChat } from "./types"
import { RootState } from '../store';
import { Dispatch, SetStateAction } from "react";
const PChat = ({typeReset, setPers, currPersonal}: {typeReset: Dispatch<SetStateAction<string>>, setPers: Dispatch<SetStateAction<number>>, currPersonal: number}) => {
    let pchats: pChat[] = useSelector((state: RootState) => state.trialUser.value).DMs

  return (
    <div className="relative mt-8 w-[290px]">
        {
            pchats.map((chat, index) => {
                return (
                    <button onClick={() => {
                        typeReset("personal")
                        setPers(chat.uid - 1)
                    }} key={index} className={`p-2 mt-2 flex flex-row bg-gray-600/20 outline-none rounded-lg w-full cursor-pointer hover:bg-slate-600/40 ${currPersonal == chat.uid ? "bg-slate-600/40" : ""}`}>
                        <img src={chat.img} alt="trialPhoto" className="h-[50px] rounded-[20px]" />
                        <div className="flex flex-col ml-4 justify-center">
                            <span className="text-start">{chat.uname}</span>
                            <span className="text-xs whitespace-nowrap w-[190px] text-start truncate">{chat.uStat}</span>
                        </div>
                    </button>
                )
            })
        }
    </div>
  )
}

export default PChat