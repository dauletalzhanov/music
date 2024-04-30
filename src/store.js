import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../src/features/playerSlice"

export default configureStore({
	reducer: {
		player: playerReducer
	},

})