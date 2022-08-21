import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchMatch } from "./Api";
import { IResponse, Match } from "./types";

export interface matchState {
  matchList: Match[] | null;
  status: "idle" | "loading" | "failed";
  error: any;
}

const initialState: matchState = {
  matchList: null,
  status: "idle",
  error: null,
};

export const getMatchAsync = createAsyncThunk("match/getMatch", async () => {
  const response = await fetchMatch();
  return response;
});

export const matchSlice = createSlice({
  name: "match",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getMatchAsync.fulfilled,
        (state, action: PayloadAction<IResponse>) => {
          state.status = "idle";
          state.matchList = action.payload.matches;
        }
      )
      .addCase(getMatchAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = matchSlice.actions;
export const selectMatchList = (state: RootState) => state.match.matchList;
export const selectstatus = (state: RootState) => state.match.status;

export default matchSlice.reducer;
