import {graphql} from 'react-apollo'
import {compose} from 'recompose'
import {removeMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";


const mutation = graphql(removeMovieMutation, {
    props: ({mutate}) => ({
        removeMovie: id => mutate({
            variables: id,
            refetchQueries: [{
                query: moviesQuery,
                variables: {name: ''}
            }]
        })
    })
})


export default compose(mutation)