const ContactRepository = require('../repositories/contactRepository');

class ContactController{

    async index(request, response){
        const { orderBy } = request.query;
        const sortOrder = typeof(orderBy) === 'string' && orderBy.toUpperCase() === 'DESC'
         ? 'DESC'
         : 'ASC';

        const contacts = await ContactRepository.findAll(sortOrder);

        response.status(200).json(contacts);
    }

    async show(request, response){
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if(!contact){
            return response.status(404).json({error: "Contact not found"});
        }

        response.json(contact);
    }

    async store(request, response){
        const { name, email, phone, category_id } = request.body;

        if(!name.trim()){
            return response.status(400).json({error: "Name is required"});
        }

        const emailAlreadyExists = await ContactRepository.findByEmail(email);

        if(emailAlreadyExists){
            return response.status(400).json({error: 'Email already been exists'});
        }

       const contact = await ContactRepository.create({name, email, phone, category_id});
       
       response.status(201).json(contact);
    }

    async update(request, response){
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        if(!name.trim()){
            return response.status(400).json({error: "Name is required"});
        }

        const emailAlreadyExists = await ContactRepository.findByEmail(email);

        if(emailAlreadyExists && emailAlreadyExists.id !== id){
            return response.status(400).json({error: "E-mail already been exists"});
        }

        const contactUpdated = await ContactRepository.update({id, name, email, phone, category_id});

        response.status(200).json(contactUpdated);
    }

    async delete(request, response){
        const { id } = request.params;

        await ContactRepository.delete(id);

        response.sendStatus(204);
    }
}

module.exports = new ContactController();