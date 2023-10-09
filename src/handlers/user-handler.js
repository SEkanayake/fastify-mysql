// const db = require('../../db/generated/client/postgres.db');

async function createUser(newUser, fastify) {

    const newUser1 = newUser;
    try {
        const client = await fastify.pg.connect(); 
  
        const result = await client.query(
          'INSERT INTO "user" (id, name) VALUES ($1, $2) RETURNING id',
          [newUser1.id, newUser1.name]
        );
  
        client.release();
        console.log("db result....",result)

        return { message: 'User created', user: { id: result.rows[0].id, ...newUser } };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
    // const newUser1 = await prisma.user.create({
    //     data: {
    //       name: 'John Doe',
    //       email: 'john@example.com',
    //     },
    //   });
      
}
async function viewUserList(fastify) {

    try {
        const client = await fastify.pg.connect(); 
      
        const result = await client.query(
          'SELECT * FROM "user" '
        );
  
        client.release();

        return {  user: result.rows };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
}

async function viewUser(userId, fastify) {
    const id = userId;
    try {
        const client = await fastify.pg.connect(); 
      
        const result = await client.query(
          'SELECT * FROM "user" WHERE id = $1', [id]
        );
  
        client.release();

        return {  user: result.rows };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
}

async function updateUser(userId, data, fastify) {
    const id = userId;
    const updatedUser = data
    try {
        const client = await fastify.pg.connect(); 
      
        const result = await client.query(
            'UPDATE "user" SET name = $1 WHERE id = $2',
            [updatedUser.name, id]      
        );
  
        client.release();

        return {  user: result.rows };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
}

async function deleteUser(userId, fastify) {
    const id = userId;
    try {
        const client = await fastify.pg.connect(); 
      
        const result = await client.query(
            'DELETE FROM "user" WHERE id = $1',
            [id]
        );
  
        client.release();

        return {  message: "success" };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
}
module.exports = {
  createUser,
  viewUser,
  viewUserList,
  updateUser,
  deleteUser
};
