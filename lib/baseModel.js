
const mongoose = require('mongoose');

class Model {
    constructor(name, schema){
        if(!name || !schema){
            throw new Error('Create Model Error ! name or schema is empty');
        }
        return mongoose.model(name, mongoose.Schema(schema, {vertionKey: false}));
    }
}

module.exports = Model;
