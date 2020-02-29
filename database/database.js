const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true); // Set to true to make all connections set the useNewUrlParser option by default.

mongoose.set('useFindAndModify', false); // Set to true to make all connections set the useNewUrlParser option by default.

mongoose.set('useUnifiedTopology', true); // Set to true to make all connections set the useUnifiedTopology option by default.

mongoose.set('maxTimeMS', 60000); //  Attaches maxTimeMS to every query.

module.exports = mongoose;