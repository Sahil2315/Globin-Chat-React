import pLogo from "../assets/pLogo.png"
import gLogo from "../assets/gLogo.svg"
import {useState} from "react"
import Profile from "./Profile"
import PChat from './PChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import PChatArea from "./PChatArea";
import GChat from "./GChat";
import GChatArea from "./GChatArea";

export const Try = () => {
  
  let [currChatType, resetChatType] = useState<string>("per")
  let [currChat, resetCurrChat] = useState<string>("none")
  let [currPersonal, resetPersonal] = useState<number>(0)
  let [currGroup, resetGroup] = useState<number>(0)

  
  return (
    <div>
      <div className="flex flex-row h-screen p-3">
        <div className="h-full relative w-[300px] rounded-lg bg-slate-600/10">
          {/* Chats Section */}
          {/* Profile */}
          <Profile />
          <div>
            {/* Chats */}
            <div className="px-2">
              {/* Chat Selection */}
              <div className="flex flex-row mt-2 w-full justify-center">
                <Tabs defaultValue="personal" className="w-full flex items-center">
                  <TabsList className="flex flex-row w-full">
                    <TabsTrigger value="personal" onClick={() => resetChatType("per")} className={`p-2 py-6 rounded-lg cursor-pointer outline-none flex flex-row w-[80px] justify-center hover:bg-slate-600/30 ${currChatType == "per" ? "bg-slate-600/30": "" }`}><img className="h-[32px]" src={pLogo} alt="DM" /></TabsTrigger>
                    <TabsTrigger value="group" onClick={() => resetChatType("grp")}  className={`p-2 py-6 rounded-lg cursor-pointer ml-2 outline-none flex flex-row w-[80px] justify-center hover:bg-slate-600/30 ${currChatType == "grp" ? "bg-slate-600/30": "" }`}><img className="h-[32px]" src={gLogo} alt="DM" /></TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <PChat typeReset = {resetCurrChat} setPers = {resetPersonal}  currPersonal = {currPersonal} />
                  </TabsContent>
                  <TabsContent value="group">  
                    <GChat typeReset = {resetCurrChat} setGroup = {resetGroup} currGroup = {currGroup} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex-1 rounded-lg h-full">
          <PChatArea currChat={currChat} currPersonal = {currPersonal} />
          <GChatArea currChat={currChat} currGroup = {currGroup} />
        </div>
        
      </div>
    </div>
  )
}
