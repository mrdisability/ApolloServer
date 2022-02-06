const { ApolloServer, gql } = require('apollo-server')

// create a memory db
const db = {
  todos: [
    {
      id: '1',
      todo: 'First Todo',
      completed: false
    },
    {
      id: '2',
      todo: 'Second Todo',
      completed: false
    },
    {
      id: '3',
      todo: 'Third Todo',
      completed: false
    }
  ]
}

// create the schema
const schema = gql(` 
 type Todo {
     id: ID!
     todo: String!
     completed: Boolean!
  }
  type Query {
    todosById(id:ID!): Todo
    allTodos: [Todo]!
  }
  type Mutation {
    insertTodo(todo: String!, completed: Boolean!): [Todo]!
  }
`)

// create the resolvers

const resolvers = {
  Query: {
    todosById: (parent, args, context, info) => {
      return db.todos.filter(todo => todo.id === args.id)[0]
    },
    allTodos: (parent, args, context, info) => {
      return db.todos
    }
  },
  Mutation: {
    insertTodo: (_, { todo, completed }) => {
      db.todos.push({
        id: Math.random().toString(),
        todo: todo,
        completed: completed
      })
      return db.todos
    }
  }
}
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
