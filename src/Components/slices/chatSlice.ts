// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pMessage, WholeAppData, gMessage } from '../types';
import localStore from "./defaultAppData.json"

export interface TrialState {
  value: WholeAppData
}

const initialState: TrialState = { 
  value: localStore 
};

const trialReducer = createSlice({
  name: 'trialReducer',
  initialState,
  reducers: {
    insertPChat: (state, action: PayloadAction<pMessage>) => {
      for(let i=0; i< state.value.DMs.length; i ++){
        if (action.payload.recid == state.value.DMs[i].uid){
          state.value.DMs[i].messages.push(action.payload)
        }
      }
    },
    insertGChat: (state, action: PayloadAction<gMessage>) => {
      state.value.groups[0].messages.push(action.payload)
    }

  },
});

export const { insertPChat, insertGChat } = trialReducer.actions;
export default trialReducer.reducer;
