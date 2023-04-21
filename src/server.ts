import { createServer, Model, Factory, Registry } from "miragejs"
import { faker } from '@faker-js/faker';
const total = 10000

export default function () {
  createServer({
    models: {
      todo: Model,
    },
    routes() {
      this.namespace = import.meta.env.VITE_API_URI
  
      this.get("/todos", function(this: any, schema, request) {
        const page: number = +request.queryParams.page || 1
        const perPage: number = +request.queryParams.limit || 8
        const end: number = perPage * page
        const start: number = end - perPage
        
        const todos = schema.all('todo')
        const data = todos.sort((a: any, b: any) => b.id - +a.id).slice(start, end)
        const json = this.serialize(data)
      
        json.totalPages = Math.ceil(todos.length / perPage)
        json.currentPage = page
        
        return json
      })
      // this.get("todos/:id")
      this.post("/todos", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.create('todo', attrs)
      })
      // this.patch("todos/:id")
      // this.del("/todos/:id")
    },
    factories: {
      todo: Factory.extend({
        text: () => faker.lorem.sentence()
      }),
    },
    seeds(server) {
      server.createList('todo', total)
    }
  })
  
}