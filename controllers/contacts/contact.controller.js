const ContactHelper = require('../../helpers/contact.helper');
const PeopleHelper = require('../../helpers/people.helper');
const peoplesModel = require('../../models/people/people.model');


const omit = require('lodash/omit');
const {USER_NOT_FOUND} = require("../../errorDefinition/errors.map");
class contact {
    static async createContact(req, res) {
        try {
            const body = req.body

            const person = await peoplesModel.findOne({person_id: body.person_id});
            console.log('person:', person)

            if (!person) {
                throw USER_NOT_FOUND
            }
            const contact = await ContactHelper.create(body);

            res.sendSuccess(contact);
        } catch (error) {
            console.log(error);
            res.sendError(error, req.header('languageId'),null,error); 
        }
    }



    static async getContacts(req, res) {
        try {
            const options = {
                sort: req.query.sort,
                page: req.query.page,         
                recordPerPage: req.query.pageSize,
                filter: req.query.q
            };


            const Contacts = await ContactHelper.getContacts(options);

            res.sendSuccess(Contacts);
        } catch (error) {
            console.log(error);
            res.sendError(error, req.header('languageId'),null,error);
        }
    }

}

module.exports = contact;