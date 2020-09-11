
const peoplesModel = require('../models/people/people.model');



class People {


 //this is used to create a people
 static async create(person) {
    try {
        const result = await peoplesModel.create(person);

        return result;
    } catch (error) {
        throw error;
    }
}




    
    static async getPeople({
        sort,
        order,
        page,
        recordPerPage,
        filter
    }) {
        try {
            sort = sort || 'updated_at';
            order = order || 'desc';
            filter = filter || '';
            page = page || 1;
            recordPerPage = parseInt(recordPerPage) || 10;
            const startIndex = (page - 1) * recordPerPage;

            let matchQuery = {
              deleted: false
            };

            let query = peoplesModel.aggregate().match(matchQuery);
            
           


            if (filter) {
                query.match({
                    $or: [
                        {
                            name: {
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
                person_id: 1,
                name: 1,
                age: 1,
                height: 1,
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
                    people: {
                        $slice: ['$data', startIndex, recordPerPage]
                    }
                });
            
            let result = await query;
            

            if (!result[0]) {
                return result;
            }

            return result[0]
        } catch (error) {
            throw error;
        }
    }

    static async getPerson(id) {

        let result = await peoplesModel.findOne({
            people_id: id
        })
        if (!result) {
            return null;
        }

        return result; 
    }

}

module.exports = People;
