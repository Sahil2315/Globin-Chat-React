import React from "react";
import { useRef, useState } from "react";
import editLogo from "../assets/edit.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useSelector } from "react-redux";
import { WholeAppData } from "./types";
import { RootState } from "../store";
const Profile = () => {
  let userWhole: WholeAppData = useSelector(
    (state: RootState) => state.trialUser.value
  );
  let fileInputRef = useRef<HTMLInputElement | null>(null);
  let [dUname, resetDefaultUname] = useState<string>(userWhole.userName);
  let [dEmail, resetDefaultEmail] = useState<string>("john@dough.com");
  let [dStatus, resetDefaultStatus] = useState<string>(userWhole.status);
  let [defaultPic, resetDefaultPic] = useState<string>(userWhole.userImg);
  let [profileimg, resetImg] = useState(defaultPic);
  let [uname, resetUsername] = useState<string>(dUname);
  let [email, resetEmail] = useState<string>(dEmail);
  let [status, resetStatus] = useState<string>(dStatus);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        resetImg(reader.result as string);
      };

      if (file) {
        reader.readAsDataURL(file);
        console.log(file);
      }
    }
  };
  let resetDefaults = () => {
    resetDefaultUname(uname);
    resetDefaultEmail(email);
    resetDefaultStatus(status);
    resetDefaultPic(profileimg);
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="absolute bottom-0 left-0 w-full p-1">
      {/* User Profile */}

      <Dialog>
        <DialogTrigger className="w-full">
          <div className="cursor-pointer flex flex-row items-center p-2 rounded-lg outline-none border-none  w-full bg-slate-600/20 hover:bg-slate-600/30">
            <img
              src={defaultPic}
              alt="Trial Profile Pic"
              className="h-[70px] w-[70px] rounded-[28px]"
            />
            <div>
              <div className="flex flex-col ml-4 gap-1 items-start">
                <span className="text-lg font-bold text-white">{dUname}</span>
                <span className="text-sm whitespace-nowrap w-[190px] text-start truncate text-gray-300">
                  {dStatus}
                </span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white/90 outline-none border-none pb-20">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl">Your Profile</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs">
                Changes made here would be Reset when the Page Reloads.{" "}
                <span className="ml-2 text-amber-500 text-sm">
                  (Trial Mode)
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row">
            <div className="relative rounded-[65px]">
              {/* Profile Photo and Editing */}
              <img
                src={profileimg}
                alt="Trial Profile Pic"
                className="h-[150px] w-[150px] z-10 rounded-[65px]"
              />
              <div
                className={`absolute top-0 left-0 cursor-pointer z-20 h-[150px] w-full rounded-[65px] bg-black/65 backdrop-blur-xs opacity-0 hover:opacity-80`}
              >
                <button
                  onClick={handleButtonClick}
                  className="h-full w-full rounded-[65px] cursor-pointer absolute z-30 top-0 left-0 flex justify-center items-center"
                >
                  <img
                    src={editLogo}
                    alt="Edit Profile"
                    className="h-[100px]"
                  />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              {/* User Information */}
              <div className="flex mb-4 flex-col ml-8 h-full text-slate-300 justify-center">
                <input
                  type="text"
                  onChange={(e) => {
                    resetUsername(e.target.value);
                  }}
                  className="cursor-pointer rounded-md px-2 border-none placeholder-slate-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-700/70 focus:cursor-text"
                  defaultValue={uname}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    resetEmail(e.target.value);
                  }}
                  className="cursor-pointer mt-3 rounded-md px-2 border-none placeholder-slate-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-700/70 focus:cursor-text"
                  defaultValue={email}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    resetStatus(e.target.value);
                  }}
                  className="cursor-pointer mt-3 rounded-md px-2 border-none placeholder-slate-300 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700/70 focus:cursor-text"
                  defaultValue={status}
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger
                  disabled={
                    dUname == uname &&
                    dEmail == email &&
                    dStatus == status &&
                    defaultPic == profileimg
                  }
                  className="w-max cursor-pointer py-2 px-6 rounded-lg outline-none bg-slate-600/20 hover:bg-slate-600/35"
                >
                  Save
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 text-white/90 outline-none border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you Sure about these Changes?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This Action (in Trial Mode) will only change the Values
                      for the Current Session.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="outline-none border-none bg-slate-300/5 cursor-pointer rounded-xl py-2 px-4 hover:bg-slate-300/35">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={resetDefaults}
                      className="outline-none border-none bg-blue-500/65 cursor-pointer rounded-xl py-2 px-4 hover:bg-blue-500/80"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
