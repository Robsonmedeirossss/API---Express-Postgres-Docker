module.exports = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', '*, Authorization');
    next();
}