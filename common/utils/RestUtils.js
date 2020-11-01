'use strict';

const ERROR_GENERIC = "Ocurrió un error en el servidor. Por favor, reintente o contacte al administrador";

/**
 * An unexpected server error
 * 
 * @param {string} message 
 */
const getServerErrorResponse = (message) => {
    return buildError(500, message);
}

const buildError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

/**
 * Builds a generic successful structure to return to UI, with a 200 statusCode
 * @param {*} data an Object with the properties to be passed back to UI as the response
 */
const buildStandarResponse = (data) => {
    return { data: data, statusCode: 200 }
}

module.exports = {    
    getServerErrorResponse,    
    buildStandarResponse
};