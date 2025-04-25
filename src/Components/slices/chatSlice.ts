// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pMessage, WholeAppData } from '../types';
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
    }
  },
});

export const { insertPChat } = trialReducer.actions;
export default trialReducer.reducer;
