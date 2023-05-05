const mongoose = require("mongoose");
//
const mongodb = process.env.MONGO_URI;

const database = process.env.MONGO_DATABASE;

async function mongooseConnect() {
	try {
		await mongoose.connect(mongodb, { dbName: database });
		console.log("connected to database");
	} catch (error) {
		console.log(error);
	}
}

module.exports = mongooseConnect;