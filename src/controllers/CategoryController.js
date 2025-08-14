const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController{
    async index(request, response){
        const { order } = request.query;
        const sortOrder = typeof(order) === 'string' && order.toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC';

        const categories = await CategoryRepository.findAll(sortOrder);

        response.json(categories);
    }

    async show(request, response){
        const { id } = request.params;
        const category = await CategoryRepository.findById(id);

        if(!category){
            return response.status(404).json({error: "Category not found"});
        }

        response.json(category);
    }

    async store(request, response){
        const { name } = request.body;
        if(!name.trim()){
            return response.status(400).json({error: "Name is required"});
        }
        const newCategory = await CategoryRepository.create(name);

        response.status(201).json(newCategory);
    }

    async update(request, response){
        const { id } = request.params;
        const { name } = request.body;

        if(!name.trim()){
            return response.status(400).json({error: "Name is required"});
        }

        const categoryExists = await CategoryRepository.findById(id);

        if(!categoryExists){
            return response.status(404).json({error: 'Category not found'});
        }

        const updatedCategory = await CategoryRepository.update(id, name);

        response.status((200)).json(updatedCategory);
    }

    async delete(request, response){
        const { id } = request.params;
        const userDeleted = await CategoryRepository.delete(id);

        response.status(200).json(userDeleted);
    }
}

module.exports = new CategoryController();