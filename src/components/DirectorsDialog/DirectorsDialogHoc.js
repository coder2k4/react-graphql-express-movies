import {compose} from "recompose"
import {graphql} from "react-apollo";
import {removeDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";
import {moviesQuery} from "../MoviesTable/queries";

const removeMutation = graphql(removeDirectorMutation, {
    props: ({mutate}) => ({
        removeDirector: id => mutate({
            variables: id,
            refetchQueries: [{query: directorsQuery,
                variables: {name: ''}}]
        })
    })
})


export default compose(removeMutation)