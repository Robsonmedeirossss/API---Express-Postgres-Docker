const ContactRepository = require('../repositories/contactRepository');

class ContactController{

    async index(request, response){
        const order = request.query;
        const sortOrder = typeof(order) === 'string' && order.toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC';
        
        const contacts = await ContactRepository.findAll(sortOrder);

        response.json(contacts);
    }

    async show(request, response){
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if(!contact){
            return response.json({error: "Contact not found"}).status(404);
        }

        response.json(contact);
    }

    async store(request, response){
        const { name, email, phone, category_id } = request.body;

        if(!name.trim()){
            return response.json({error: "Name is required"}).status(400);
        }

        const emailAlreadyExists = await ContactRepository.findByEmail(email);

        if(emailAlreadyExists){
            return response.json({error: 'Email already been exists'}).status(400);
        }

       const contact = await ContactRepository.create({name, email, phone, category_id});
       
       response.json(contact);
    }

    async update(request, response){
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        if(!name.trim()){
            return response.json({error: "Name is required"});
        }

        const emailAlreadyExists = await ContactRepository.findByEmail(email);

        if(emailAlreadyExists && emailAlreadyExists.id !== id){
            return response.json({error: "E-mail already been exists"}).status(400);
        }
        const contactUpdated = await ContactRepository.update({id, name, email, phone, category_id});
        response.json(contactUpdated);
    }

    async delete(request, response){
        const { id } = request.params;

        const userDeleted = await ContactRepository.delete(id);

        response.json(userDeleted);
    }
}

module.exports = new ContactController();