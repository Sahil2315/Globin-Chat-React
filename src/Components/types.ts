export type pMessage = {
  msgid: number;
  sendid: number;
  recid: number;
  timing: string;
  content: string;
  date: string;
};
export type pChat = {
  uid: number;
  uname: string;
  img: string;
  uStat: string;
  messages: pMessage[];
};

export type gMessage = {
  memberid: number;
  gmsgid: number;
  cont: string;
  time: string;
  date: string;
};

export type user = {
  userid: number;
  uname: string;
  img: string;
  
}

export type gChat = {
  grpid: number;
  grpname: string;
  grplogo: string;
  grpdesc: string;
  roomid: string;
  messages: gMessage[];
  members: user[];
};

export type WholeAppData = {
  DMs: pChat[];
  groups: gChat[];
  currentUserId: number;
  userImg: string;
  userName: string;
  status: string;
};
