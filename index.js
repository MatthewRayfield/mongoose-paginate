'use strict';

/**
 * @package mongoose-paginate
 * @param {Object} [query={}]
 * @param {Object} [options={}]
 * @param {Number} [options.page]
 * @param {Number} [options.offset=0] - Use offset or page to set skip position
 * @param {Number} [options.limit=10]
 * @param {ObjectId} [options.startId]
 * @param {String} [options.order]
 * @param {Function} [callback]
 * @returns {Query}
 */

function paginate(query, options, callback) {
    query = query || {};
    options = options || {};

    options.limit = options.limit || 10;

    let docsQuery = this.find(query);

    if (options.startId) {
        let order = options.order || "$lt";
        let idQuery = {};

        idQuery[order] = options.startId;

        docsQuery = docsQuery.find({_id: idQuery});
    }
    else {
        if (options.page) {
            options.offset = (options.page - 1) * options.limit;
        }

        if (options.offset) {
            docsQuery = docsQuery.skip(options.offset);
        }
    }

    docsQuery = docsQuery.limit(options.limit);

    if (callback) {
        return docsQuery.exec(callback);
    }
    else {
        return docsQuery;
    }
}

/**
 * @param {Schema} schema
 */

module.exports = function(schema) {
  schema.statics.paginate = paginate;
};

module.exports.paginate = paginate;
