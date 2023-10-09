'use strict'
const userRoute = require("./routes/user-route");
// const handler = require("./handlers")
const path = require('path')
const AutoLoad = require('fastify-autoload')
// const fastify = require('fastify')();
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

module.exports = function (fastify, opts, next) {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // This loads all hooks defined in hooks
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'hooks'),
    options: Object.assign({}, opts)
  })

  // fastify.decorate('prisma', prisma);
  fastify.register(userRoute)

  // fastify.register(handler)
  next()

  
}
