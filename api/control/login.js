const app = require('../../app.js').app;
const doc = require('../../apiDoc.js');
const util = require('../../util.js');
const jws = require('jws');
const config = require('../../config.js');
const selectUser = require('../../app.js').selectUser;
const returnJSON = util.returnJSON;

doc.paths['/v1/login'] = {}
doc.paths['/v1/login'].post = {
    tags: [
        "login"
    ],
    summary: "로그인",
    description: "로그인",
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    parameters: [
        {
            in: "body",
            name: "body",
            description: "",
            schema: {
                type: "object",
                properties: {
                    user_id: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            }
        }
    ],
    responses: {
        201: {
            description: "성공",
            schema: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean"
                    },
                    msg: {
                        type: "string"
                    },
                    result: {
                        type: "object",
                        properties: {
                            access_token: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: "실패",
            schema: {
                $ref: "#/definitions/error"
            }
        }
    }
}

app.post('/api/v1/login', function (req, res) {
    util.requstBodyParse(req, res, onbody);
    function onbody(body) {
        if (
            (typeof body.user_id !== 'string') ||
            (typeof body.password !== 'string')
        ) {
            returnJSON(res, 201, false, '잘못된 인자', null);
            return;
        }
        findUser(body.user_id, body.password);
    }
    function findUser(user_id, password) {
        const userList = selectUser(user_id, password)

        if (userList.length < 1) {
            returnJSON(res, 404, false, '조건에 맞는 사용자가 없습니다.', null);
            return;
        }

        userAuth(userList[0].uid)
    }
    function userAuth(uid) {
        const exp = parseInt((new Date()).getTime() / 1000) + config.jwt_alive_time;
        const signature = jws.sign({
            header: { alg: config.jwt_alg },
            payload: {
                type: 'userAuth',
                uid: uid,
                exp: exp
            },
            secret: config.jwtSecret
        });

        res.setHeader('Set-Cookie', `access_token=${signature}; path=/; httpOnly`);
        returnJSON(res, 200, true, '로그인 성공', {
            access_token: signature
        });
    }
})