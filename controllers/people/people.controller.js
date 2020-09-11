const PeopleHelper = require('../../helpers/people.helper');

const omit = require('lodash/omit');
const {
  HOTEL_NOT_FOUND,
  ROOM_NOT_FOUND,
  ROOM_CAPACITY_EXCEEDED,
  PAYMENT_ERROR,
  ORDER_NOT_FOUND,
  INVALID_CREDIT_CARD,
  PAYMENT_RECORD_NOT_FOUND,
  PAYMENT_COMPLETE
} = require("../../errorDefinition/errors.map");
class people {
    static async createPeople(req, res) {
        try {
            const body = req.body

            const people = await PeopleHelper.create(body);

            res.sendSuccess(people);
        } catch (error) {
            console.log(error);
            res.sendError(error, req.header('languageId'),null,error); 
        }
    }



    static async getPeoples(req, res) {
        try {
            const options = {
                sort: req.query.sort,
                people: req.query.people,
                page: req.query.page,
                recordPerPage: req.query.pageSize,
                filter: req.query.filter
            };

            const Peoples = await PeopleHelper.getPeople(options);

            res.sendSuccess(Peoples);
        } catch (error) {
            console.log(error);
            res.sendError(error, req.header('languageId'),null,error);
        }
    }

}

module.exports = people;