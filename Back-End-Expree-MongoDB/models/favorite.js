const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    certificates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;