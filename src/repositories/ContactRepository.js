const database = require('../database/index');

class ContactRepository{
    async findAll(order){
        const rows = await database.query(`
            SELECT contacts.*, categories.name AS category_name
            FROM contacts 
            LEFT JOIN categories ON categories.id = contacts.category_id
            ORDER BY name ${order};
        `);
        return rows;
    }

    async findById(id){
        const [ row ] = await database.query(`
        SELECT contacts.*, categories.name AS category_name
        FROM contacts 
        LEFT JOIN categories ON categories.id = contacts.category_id
        WHERE contacts.id = $1
        `, [id]);

        return row;
    }

    async findByEmail(email){
        const [ row ] = await database.query(`
            SELECT * FROM contacts WHERE email = $1    
        `, [email]);

        return row;
    }

    async create({name, email, phone, category_id}){
        const [ row ] = await database.query(`
            INSERT INTO contacts(name, email, phone, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [name, email, phone, category_id]);

        return row;
    }

    async update({id, name, email, phone, category_id}){
        const [ row ] = await database.query(`
            UPDATE contacts
            SET id = $1, name = $2, email = $3, phone = $4, category_id = $5
            WHERE id = $1 RETURNING *;    
        `, [id, name, email, phone, category_id]);

        return row;
    }

    async delete(id){
        const [ row ] = await database.query(`
        DELETE FROM contacts WHERE id = $1;`, [id], true);

        return row;
    }
}

module.exports = new ContactRepository();