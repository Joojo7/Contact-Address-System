
const contactsModel = require('../models/contacts/contact.model');



class Contact {


 //this is used to create a contact
 static async create(contact) {
    try {
        const result = await contactsModel.create(contact);

        return result;
    } catch (error) {
        throw error;
    }
}




    
    static async getContacts({
        sort,
        order,
        page,
        recordPerPage,
        filter,
    }) {
        try {
            sort = sort || 'updated_at';
            order = order || 'desc';
            filter = filter || '';
            page = parseInt(page) || 1;
            recordPerPage = parseInt(recordPerPage) || 10;
            const startIndex = (page - 1) * recordPerPage;

            let query = contactsModel.aggregate().match({})
            .lookup({
                from: 'peoples',
                localField: 'person_id',
                foreignField: 'person_id',
                as: 'people'
            })
            .unwind({
                path: '$people',
                preserveNullAndEmptyArrays: true
            })
            
            

            if (filter) {
                query.match({
                    $or: [
                        {
                            "people.name": {
                                $regex: `${filter}`,
                                $options: 'xi'
                            }
                        },
                        {
                            email: {
                                $regex: filter,
                                $options: 'xi'
                            }
                        },
                        {
                            number: {
                                $regex: filter,
                                $options: 'xi'
                            }
                        }
                    ]
                });
            }

           

            query.project({
                contact_id: 1,
                person_id: 1,
                name: "$people.name",
                age: "$people.age",
                height: "$people.height",
                email: 1,
                number: 1,
                created_at: 1,
                updated_at: 1
        })

            // sort
            query
                .sort({
                    [sort]: order
                })

                .group({
                    _id: null,
                    total_count: {
                        $sum: 1
                    },
                    data: {
                        $push: '$$ROOT'
                    }
                })

                .project({
                    total_count: true,
                    contacts: {
                        $slice: ['$data', startIndex, recordPerPage]
                    }
                });
            
            let result = await query;
            

            if (!result[0]) {
                return {
                    "_id": null,
                    "total_count": 0,
                    "contacts": []
                };
            }

            return result[0]
        } catch (error) {
            throw error;
        }
    }

    static async getContact(id) {

        let result = await contactsModel.findOne({
            contact_id: id
        })
        if (!result) {
            return null;
        }

        return result; 
    }

}

module.exports = Contact;
