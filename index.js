/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

module.exports = function (operations, callback) {

    ans = [];
    noError = true;
    firstError = undefined;
    promises = [];

    operations.forEach(function (item) {
        cur = makePromise(item);
        promises.push(cur);
    });

    res = Promise.all(promises).then(x =>callback(null, x),
            x => callback(x));

    function makePromise(operation) {
        return new Promise(function (resolve, reject) {

            function next(err, data) {
                if (err === null) {
                    resolve(data);

                } else {
                    reject(err);
                }
            }
            operation(next);
        })
    }
};
