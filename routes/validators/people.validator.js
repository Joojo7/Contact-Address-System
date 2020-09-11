const create = {
    name: {
        in: ['body'],
        isString: true,
        exists: {
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    },
    age: {
        in: ['body'],
        isInt: true,
        exists: {
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    },
    height: {
        in: ['body'],
        isInt: true,
        exists: {
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    }
};



module.exports = { create };
