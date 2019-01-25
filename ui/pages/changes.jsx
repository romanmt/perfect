import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import { kea } from 'kea'
const { List } = require('immutable');

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
        const { combinations } = this.props
        const { addCombination } = this.actions
        return <div>
            <table>
                <thead>
                    <th>A Chord</th>
                    <th>B Chord</th>
                    <th>BPM</th>
                    <th>Last Practiced</th>
                </thead>
                <tbody>
                    {combinations.map(function(combination){
                         return <tr>
                             <td>{combination[0]}</td>
                             <td>{combination[1]}</td>
                             <td>{combination[2]}</td>
                             <td>{combination[3]}</td>
                         </tr>
                     })}
                </tbody>
            </table> 
            <button onClick={() => {addCombination(["Amaj", "CMaj", 0, "yesterday"])}}>Add Combination</button>
        </div>
    }
}

export default withRedux(initStore)(Changes)
