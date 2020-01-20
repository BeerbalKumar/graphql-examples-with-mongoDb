const graphql = require('graphql');
const _ = require("lodash");
const bookSchema = require('./../Config/Modal/booksShema')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;




// const books =[
//      {name:"Name of the Wind",genre:"Fantasy",id:"1",authorId:"1"},
//      {name:"The Final Empire",genre:"Fantasy",id:"2",authorId:"2"},
//      {name:"The Long Earth",genre:"Sci-Fi",id:"3",authorId:"3"},
//      {name:"The Long Sun",genre:"Sci-Fi",id:"4",authorId:"2"},
//      {name:"The Long Moon",genre:"Sci-Fi",id:"5",authorId:"2"},
//      {name:"My Desert Sobs",genre:"Sci-Fi",id:"6",authorId:"2"}
// ]

// const authors =[
//     {name:"Amrat",age:"40",id:"1"},
//     {name:"Suneel",age:"50",id:"2"},
//     {name:"Darpan",age:"70",id:"3"}
// ]



const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books,{authorId:parent.id})
            }
        }
    })
})


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //  return _.find(authors,{id:parent.authorId})
            }
        }
    })
})





const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(books,{id:args.id})
                return bookSchema.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors,{id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //  return books
                return bookSchema.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
            }
        }
    //    deleteBook:{
    //     type: BookType,
    //     args: { id: { type: GraphQLID } },
    //     resolve(parent, args) {
    //         return bookSchema.findByIdAndDelete(args.id)
    //     }
    //    }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBooks: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let books = new bookSchema({
                    name: args.name,
                    genre: args.genre
                })

               return books.save()
            },

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})