const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
require('dotenv').config();

var db_url = process.env.DB_URL || 'mongodb://localhost:27017/Todo';
// Connect mongoose
mongoose.connect(db_url, {useNewUrlParser: true}, (err, succ) => {
    if(!err) console.log('database connect success');

});


var Schema = mongoose.Schema;

var schema = new Schema({
    title : String,
    completed : Boolean,
    created : Date
});

var Todo = mongoose.model('Todo', schema);

schema.pre('save', (next) => {
    this.created = new Date();
    next();
});
module.exports = Todo;
