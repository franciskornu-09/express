const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    account: { type: Number, default: 0}
});

mongoose.model('users', userSchema);