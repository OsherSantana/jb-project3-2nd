import { configureStore } from "@reduxjs/toolkit";
import { userFollowingSlice } from "./userFollowingSlice";
import { vacationProfileSlice } from "./vacationProfileSlice";
import vacationFeedReducer from "./vacationFeedSlice";

const store = configureStore({
    reducer: {
        userFollowing: userFollowingSlice.reducer,
        vacationProfile: vacationProfileSlice.reducer,
        vacationFeed: vacationFeedReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
