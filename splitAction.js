module.exports = function() {

    return function (req, res, next) {

        let  buf = JSON.parse(Buffer.from((req.headers.authorization.split(' ')[1]).split('.')[1], 'base64').toString());


        if (req && req.headers.hasOwnProperty('companyinfo')) {
            req.user = {};
            req.user.iss = buf.iss;
            req.user.sub = buf.sub;
            let arr = req.headers['companyinfo'].split(":");
            if (arr.length > 1) {

                req.user.tenant = arr[0];
                req.user.company = arr[1];
            }
            next();
        }
        else {
            next();
        }


    };
};

