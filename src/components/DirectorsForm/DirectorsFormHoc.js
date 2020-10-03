import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';


import {styles} from './styles';
import {graphql} from "react-apollo";
import {addDirectorMutation, updateDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";

const withComposeGraphQL = compose(graphql(addDirectorMutation, {
        props: ({mutate}) => ({
            addDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: {name: ''}
                }] // Для повторного запроса данных без перезагрузки
            })
        })
    }),

    graphql(updateDirectorMutation, {
        props: ({mutate}) => ({
            updateDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: {name: ''}
                }] // Для повторного запроса данных без перезагрузки
            })
        })
    }),

    graphql(directorsQuery, {
        options: ({name = ''}) => ({
            variables: {name}
        })
    })
)

export default compose(withStyles(styles), withComposeGraphQL);
