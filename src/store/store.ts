import { configureStore } from "@reduxjs/toolkit";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "react";

import postsReducer from "./slices/postsSlices";

const store = configureStore({
    reducer: {
        post: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<AnyAction> &
    ThunkDispatch<RootState, null, AnyAction>;

export default store;
