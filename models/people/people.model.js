const mongoose = require('mongoose');
const db = require('../../databases/airAsia.database');
const mongooseSoftDelete = require('mongoose-delete');

const Schema = new mongoose.Schema(
    {
        person_id:String,
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }

    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

Schema.pre('save', function(next) {
    this.person_id = this._id; 
    next();
});

Schema.plugin(mongooseSoftDelete, { 
    overrideMethods: 'all'
});

module.exports = db.model('people', Schema);
