const handler = require("../handlers/user-handler");

async function userRoute(fastify, options) {

    fastify.get('/users', async (request, reply) => {
      
      const viewUsers = await handler.viewUserList(fastify);
  
      reply.send({ message: 'List of users' , ...viewUsers});
    });
  
    fastify.post('/users', async (request, reply) => {
      
      const newUser = request.body;
    
      const createdUser = await handler.createUser(newUser, fastify);
     
      reply.send({ message: 'User created', ...createdUser });
    });

    fastify.get('/users/:id', async (request, reply) => {
      
      const userId = request.params.id;

      const viewUser = await handler.viewUser(userId, fastify);
      
      reply.send({ message: 'User Details' , ...viewUser});
    });

    fastify.put('/users/:id', async (request, reply) => {
      const userId = request.params.id;
      const updateUser = request.body; 
      
      const updatedUser = await handler.updateUser(userId, updateUser, fastify);

      reply.send({ message: 'User updated' });
    });

    fastify.delete('/users/:id', async (request, reply) => {
      const userId = request.params.id;
    
      const deleteUser = await handler.deleteUser(userId, fastify);

      reply.send({ message: 'User deleted' });
    });
  }
  
  module.exports = userRoute;
  