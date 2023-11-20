const config = require('./config.js');
const package = require('./package.json');

module.exports = {
    swagger: "2.0",
    info: {
        description: package.name,
        version: package.version,
        title: package.name,
        termsOfService: "",
        contact: {
            email: "daemyung6@gmail.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    host: config.host,
    basePath: "/api",
    schemes: [ config.schemes ],
    paths: {},
    securityDefinitions: {

    },
    definitions: {
        error: {
            properties: {
                err: {
                    type: "boolean"
                },
                msg: {
                    type: "string"
                }
            }
        }
    },
    externalDocs: {
        description: "Find out more about Swagger",
        url: "http://swagger.io"
    }
};