'use strict'

const fp = require('fastify-plugin')
const pg = require('fastify-postgres')

module.exports = fp(async (fastify, opts) => {
  const postgresOpts = Object.assign({}, {
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DATABASE || 'fastify',
    password: process.env.POSTGRES_PASSWORD || '123',
    port: process.env.POSTGRES_PORT || '5432'
  }, opts.pg)

  fastify.register(pg, postgresOpts)
})
