module.exports = (source, fieldName) =>{
    
    return (request, response, next) => {
        const requestBody = request[source];
        let uuid = requestBody[fieldName];

        if(fieldName === 'category_id' && !uuid){
            return next();
        }

        if(!requestBody || !uuid){
            return response
                .status(400)
                .json({error: `${fieldName} is required`})
        }

        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        regex.test(uuid) ? next() : response.status(400).json({ error: `${fieldName} invalid` }); 

    }
}
