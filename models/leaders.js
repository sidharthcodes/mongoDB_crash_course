const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true 		
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	featured: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true
});

var Leaders = mongoose.model('Leader',leaderSchema); // Mongoose will take plural of 'Leader' and pass it as collection name
module.exports = Leaders;