module.exports.dateToString = function (date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let mn = date.getMinutes();
    mn = mn < 10 ? '0' + mn : mn;
    let s = date.getSeconds();
    s = s < 10 ? '0' + s : s;

    return `${y}-${m}-${d} ${h}:${mn}:${s}`;
}
function returnJSON(res, code, success, msg, result) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.writeHead(code);
    res.end(JSON.stringify({
        success: success,
        msg: msg,
        result: result
    }));
}
module.exports.returnJSON = returnJSON;
module.exports.requestBodyParse = function (req, res, callback) {
    let data = [];
    req.on('data', function (chunk) {
        data.push(chunk)
    });
    req.on('end', function () {
        let body = String(Buffer.concat(data));
        try {
            body = JSON.parse(body);
        } catch (error) {
            returnJSON(res, 400, false, 'json parse error', null);
            return;
        }
        callback(body);
    })
}