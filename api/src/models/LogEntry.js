const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = Schema({
  sourceCoordinates: {
    type: String,
    required: true,
  },
  destinationCoordinates: {
    type: String,
    required: true,
  },
  time : { 
    type: Date.n 
  },
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
