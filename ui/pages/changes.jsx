import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import { kea } from 'kea'
import { List } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

@kea({
    actions: () => ({
        addCombination: (combination) => ({combination})
    }),
    reducers: ({actions}) => ({
        combinations: [List(), PropTypes.Array, {
            [actions.addCombination]: (state, payload) => state.push(payload.combination)
        }]
    })
})

class Changes extends Component {

    render() {
        const { classes, combinations } = this.props
        const { addCombination } = this.actions
        return <div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>A Chord</TableCell>
                            <TableCell>B Chord</TableCell>
                            <TableCell>BPM</TableCell>
                            <TableCell>Last Practiced</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {combinations.map(function(combination){
                            return <TableRow>
                                <TableCell>{combination[0]}</TableCell>
                                <TableCell>{combination[1]}</TableCell>
                                <TableCell>{combination[2]}</TableCell>
                                <TableCell>{combination[3]}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Paper>

            <Button variant="outlined"
                    className={classes.button}
                    onClick={() => {addCombination(["Amaj", "CMaj", 0, "yesterday"])}}>
                Add Combination
            </Button>
        </div>
    }
}

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: '30px',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
})

const styled = withStyles(styles) (Changes)
export default withRedux(initStore) (styled)
