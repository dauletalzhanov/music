//import mongoose from "mongoose"
const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	password: String,
	mood: String,
	playlist: [{ 
		type: Schema.Types.ObjectId, 
		ref: "Playlist" 
	}],
})

module.exports = mongoose.model("User", UserSchema)