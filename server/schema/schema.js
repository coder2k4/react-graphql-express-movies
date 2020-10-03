const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql


/*

const directorsJson = [
  {"_id":{"$oid":"5f7842c5534368eb09df23ba"},"name":"Quentin Tarantino","age":{"$numberInt":"55"}}
  {"_id":{"$oid":"5f78430c534368eb09df2cd8"},"name":"Michael Radford","age":{"$numberInt":"72"}}
  {"_id":{"$oid":"5f784319534368eb09df2e64"},"name":"James McTeigue","age":{"$numberInt":"51"}}
  {"_id":{"$oid":"5f784325534368eb09df2fe1"},"name":"Guy Ritchie","age":{"$numberInt":"50"}}
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5f7842c5534368eb09df23ba" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5f78430c534368eb09df2cd8" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5f784319534368eb09df2e64" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5f7842c5534368eb09df23ba" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5f7842c5534368eb09df23ba" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5f78430c534368eb09df2cd8" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5f784319534368eb09df2e64" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5f784325534368eb09df2fe1" },
];
const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];
const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];

*/


const Movies = require('../models/movie')
const Directors = require('../models/director')


// Описываем тип данных таблицы Movies
const MoviesType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        // Связь по id с таблицей Режиссеров
        directorId: {
            type: DirectorsType,
            resolve(parent, args) {
                //return directors.find(dir => dir.id === parent.id)
                return Directors.findById(parent.id)
            }
        }
    })
})

// Описываем тип данных таблицы Режиссеры
const DirectorsType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},

        // Получем все фильмы
        movies: {
            type: GraphQLList(MoviesType),
            resolve(parent, args) {
                //return movies.filter(movie => movie.directorId === parent.id)
                return Movies.findById(parent.id)
            }
        }
    })
})


/// ЗАПРОСЫ

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MoviesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //return movies.find(movie => movie.id === args.id)
                return Movies.findById(args.id)
            }
        },

        movies: {
            type: GraphQLList(MoviesType),
            resolve(parent, args) {
                //return movies
                return Movies.find({})
            }
        },

        director: {
            type: DirectorsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //return directors.find(director => director.id === args.id)
                return Directors.findById(args.id)
            }
        },

        directors: {
            type: GraphQLList(DirectorsType),
            resolve(parent, args) {
                //return directors
                return Directors.find({})
            }
        },
    }
})


/// МУТАЦИИ

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        addMovie: {
            type: MoviesType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLString},
            },
            resolve(parent, args) {
                const movie = new Movies({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save()
            }
        },

        removeMovie: {
            type: MoviesType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Movies.findByIdAndRemove(args.id)
            }
        },

        updateMovie: {
            type: MoviesType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {name: args.name, genre: args.genre, directorId: args.directorId}
                    },
                    {new: true}
                )
            }
        },


        addDirector: {
            type: DirectorsType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args) {
                const director = new Directors({
                    name: args.name,
                    age: args.age
                })
                return director.save()
            }
        },

        removeDirector: {
            type: DirectorsType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Directors.findByIdAndRemove(args.id)
            }
        },

        updateDirector: {
            type: DirectorsType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Directors.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {name: args.name, age: args.age}
                    },
                    {new: true}
                )
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})