const create = {
    email: {
        in: ['body'],
        isString: true,
        exists: {
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    },
    number: {
        in: ['body'],
        isNumber: true,
        exists: {
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    }
};



module.exports = { create };
