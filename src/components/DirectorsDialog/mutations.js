import { gql } from "apollo-boost"

export const removeDirectorMutation = gql`
    mutation deleteDirector($id: ID){
        removeDirector(id:$id){
            id
        }
    }
    `