import {gql} from 'apollo-boost'

export const addMovieMutation = gql`
    mutation addMovie($name: String, $genre: String, $director: String, $rate: Int, $watched: Boolean){
        addMovie(name: $name, genre: $genre, director: $director, rate: $rate, watched: $watched) {
            name
        }
    }
`

export const updateMovieMutation = gql`
    mutation updateMovie($id:ID,$name: String, $genre: String, $director: String, $rate: Int, $watched: Boolean){
        updateMovie(id:$id,name: $name, genre: $genre, director: $director, rate: $rate, watched: $watched) {
            id
        }
    }
`