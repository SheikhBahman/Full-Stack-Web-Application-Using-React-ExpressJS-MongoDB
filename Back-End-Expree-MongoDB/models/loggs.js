const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

var serverLoggsSchema = new Schema({
    log: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
var Loggs = mongoose.model('Loggs', serverLoggsSchema);

module.exports = Loggs;