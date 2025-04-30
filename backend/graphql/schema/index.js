const graphql = require('graphql')
const axios = require('axios')

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLFloat
} = graphql

// Product
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
      id: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
    }
 })

// Stuff
const StuffType = new GraphQLObjectType({
  name: 'Stuff',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },  
    category: { type: GraphQLString },
    image: { type: GraphQLString }
  })
});

 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      products: { 
        type: new GraphQLList(ProductType), 
        args: { first: { type: GraphQLInt } },
        resolve(parent, args) {
           return axios.post('https://d6111j-bq.myshopify.com/api/2024-04/graphql.json', {
            query: `
            {
              products(first: ${args.first}) {
                edges {
                  node {
                    id
                    title
                    description
                  }
                }
              }
            }
          `,
          }, {
              headers: {
                'X-Shopify-Storefront-Access-Token': '6c348f93668f75dc7ffbd77b4606f928',
                'Content-Type': 'application/json',
              },
           } )
           .then(res => res.data.data.products.edges.map(edge => edge.node));        }
      },

      stuffs: {  
        type: new GraphQLList(StuffType),
        resolve() {
          return axios.get('https://dummyjson.com/products/category/smartphones')
            .then(res => res.data.products)
            .catch(err => {
              throw new Error("Failed to fetch stuffs");
            });
        }
      },
      stuff: {  
        type: StuffType,
        args: { id: { type: GraphQLInt } },
        resolve(_, args) {
          return axios.get(`https://dummyjson.com/products/category/smartphones/${args.id}`)
            .then(res => res.data.products)
            .catch(err => {
              throw new Error("Failed to fetch stuff");
            });
        }
      }
    
    } 
 })


 module.exports = new GraphQLSchema({
    query: RootQuery
})

