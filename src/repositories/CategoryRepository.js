const database = require('../database/index');

class CategoryRepository{
    async findAll(order){
        const rows = await database.query(`
            SELECT * FROM categories ORDER BY name ${order}
        `);

        return rows;
    }

    async findById(id){
        const [ row ] = await database.query(`
            SELECT * FROM categories WHERE id = $1`,
            [id]);

        return row;
    }

    async create(name){
        const [ row ] = await database.query(`
           INSERT INTO categories(name)
           VALUES($1) RETURNING *
           `, [name]);

           return row;
    }

    async update(id, name){
        const [ row ] = await database.query(`
            UPDATE categories SET id = $1, name = $2
            WHERE id = $1 RETURNING *
        `, [id, name])

        return row;
    }

    async delete(id){
        const [ row ] = await database.query(`
           DELETE FROM categories 
           WHERE id = $1 RETURNING *
        `, [id]);

        return row;
    }
}

module.exports = new CategoryRepository();