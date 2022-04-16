import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  name: string;
  orgId: number;
  age: number;
  desc?: string;
}

const initialState: IUserState = {
  name: 'lw',
  orgId: 117,
  age: 23,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    change(state, action: PayloadAction<IUserState>) {
      // state = { ...state, ...action.payload };
      return { ...state, ...action.payload };
    },
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    init() {
      return initialState;
    },
  },
});

export const { change, changeName, init } = UserSlice.actions;
export default UserSlice.reducer;
