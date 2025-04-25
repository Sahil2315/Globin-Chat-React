import { useSelector } from "react-redux"
import { gChat } from "./types"
import { RootState } from '../store';
import { Dispatch, SetStateAction } from "react";
const GChat = ({typeReset, setGroup, currGroup}: {typeReset: Dispatch<SetStateAction<string>>, setGroup: Dispatch<SetStateAction<number>>, currGroup: number}) => {
    let gchats: gChat[] = useSelector((state: RootState) => state.trialUser.value).groups

  return (
    <div className="relative mt-8 w-[290px]">
        {
            gchats.map((chat, index) => {
                return (
                    <button onClick={() => {
                        typeReset("group")
                        setGroup(chat.grpid)
                    }} key={index} className={`p-2 mt-2 flex flex-row bg-gray-600/20 outline-none rounded-lg w-full cursor-pointer hover:bg-slate-600/40 ${currGroup == chat.grpid ? 'bg-slate-600/40' : ''}`}>
                        <img src={chat.grplogo} alt="trialPhoto" className="h-[50px] rounded-[20px]" />
                        <div className="flex flex-col ml-4 justify-center">
                            <span className="text-start">{chat.grpname}</span>
                            <span className="text-xs whitespace-nowrap w-[190px] text-start truncate">{chat.grpdesc}</span>
                        </div>
                    </button>
                )
            })
        }
    </div>
  )
}

export default GChat