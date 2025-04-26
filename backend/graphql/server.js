var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")

const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema')

const app = express()
 
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")