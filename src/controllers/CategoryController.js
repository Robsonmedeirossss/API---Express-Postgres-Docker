const CategoryRepository = require('../repositories/categoryRepository');

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
            return response.json({error: "Category not found"}).status(404);
        }
        response.json(category);
    }

    async store(request, response){
        const { name } = request.body;
        if(!name.trim()){
            return response.json({error: "Name is required"}).status(400);
        }
        const newCategory = await CategoryRepository.create(name);
        response.json(newCategory).status(201);
    }

    async update(request, response){
        const { id } = request.params;
        const { name } = request.body;
        if(!name.trim()){
            return response.json({error: "Name is required"}).status(400);
        }
        const categoryExists = await CategoryRepository.findById(id);
        if(!categoryExists){
            return response.json({error: 'Category not found'}).status(404);
        }
        const updatedCategory = await CategoryRepository.update(id, name);
        response.json(updatedCategory).status(201);
    }

    async delete(request, response){
        const { id } = request.params;
        const userDeleted = await CategoryRepository.delete(id);
        response.json(userDeleted).status(200);
    }
}

module.exports = new CategoryController();