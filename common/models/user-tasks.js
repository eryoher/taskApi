'use strict';

const RestUtils = require("../utils/RestUtils");

module.exports = function (Usertasks) {

    /**
     * To search tasks by userId
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Usertasks.remoteMethod('getTasksByUser', {
        accepts: [{
            arg: 'req',
            type: 'object',
            'description': 'all object data',
            'http': {
                'source': 'req'
            }
        },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'Post current quotation',
        http: {
            verb: 'get'
        },
    });

    Usertasks.getTasksByUser = async function (req) {
        try {
            const { userId, filter } = req.query;

            let where = {
                user_id: userId
            }

            if (filter && filter !== 'A') {
                where.state = (filter === 'D') ? 1 : 0;
            }           
            const tasks = await Usertasks.find({where});
            return RestUtils.buildStandarResponse(tasks);
        } catch (error) {
            console.error(error)
            throw RestUtils.getServerErrorResponse(error);
        }
    }


    Usertasks.remoteMethod('updateTasks', {
        accepts: [
            { arg: 'params', type: 'object', 'description': 'check code and enabled user', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'create user',
        http: {
            verb: 'post'
        },
    });

    Usertasks.updateTasks = async function ({ tasksId, params }) {

        try {
            const tasks = await Usertasks.findOne({ where: { id: tasksId } });

            if (tasks) {
                await tasks.updateAttributes(params);
            } else {
                return RestUtils.buildStandarResponse(`Tasks don't found`);
            }

            return RestUtils.buildStandarResponse(tasks);
        } catch (error) {
            console.log(error);
            throw RestUtils.getServerErrorResponse(error);
        }
    }

};
