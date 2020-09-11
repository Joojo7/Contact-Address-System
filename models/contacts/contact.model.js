const mongoose = require('mongoose');
const db = require('../../databases/airAsia.database');
const mongooseSoftDelete = require('mongoose-delete');

const Schema = new mongoose.Schema(
    {
        person_id:String,
        contact_id: String,
        email: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }

    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

Schema.pre('save', function(next) {
    this.contact_id = this._id; 
    next();
});

Schema.plugin(mongooseSoftDelete, { 
    overrideMethods: 'all'
});

module.exports = db.model('contact', Schema);
