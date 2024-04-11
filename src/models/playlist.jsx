//import mongoose from "mongoose"
const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
	songName: String,
	artistName: String,
	url: String,
	length: String,
	artworkURL: String
})

module.exports = mongoose.model("Playlist", PlaylistSchema)