import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'select'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
        render()
        {
            const {onSubmitForm, submitState, formValues} = this.props
            return (
                <div>
                    First Name : <input type="text" ref="task" placeholder="First Name" id="fname"/><br/><br/>
                    Last Name : <input type="text" ref="task" placeholder="Last Name" id="lname"/><br/><br/>
                    Hobbies : <select value={this.state.value} onChange={this.onChange.bind(this)}>
                    <option value="select">Select an Option</option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                </select><br /><br />
                    <button onClick={onSubmitForm}>Submit</button>
                    <br/><br/>
                    {submitState}
                    <br/> <br/>Form Values: <textarea
                    value={formValues.fname + ' ' + formValues.lname}> {formValues.fname}</textarea>
                </div>
            )
        }
    }


UserForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    submitState: PropTypes.string,
    formValues: PropTypes.object,
}

// Action

const submitInitiateAction = {type: 'submitInitiated'}
const submitCompleteAction = {type: 'submitComplete'}

// Reducer
function storeReducer(state = { count: 0 , submitState: '', formValues: { 'fname': '', 'lname': ''}}, action) {
  const count = state.count
  switch (action.type) {
      case 'submitInitiated':
          return {
              submitState : "Loading"
          }
      case 'submitComplete':
          return {
              submitState: 'Submited',
              formValues: {
                  'fname': document.getElementById('fname').value,
                  'lname': document.getElementById('lname').value,
              }
          }
    default:
      return state
  }
}

// Store
const store = createStore(storeReducer)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
      submitState: state.submitState,
      formValues: state.formValues
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
      onSubmitForm: () => {
        dispatch(submitInitiateAction)

          setTimeout(() => {
              dispatch(submitCompleteAction)
          }, 1000)
      }
  }
}

// Connected Component

const FormApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)

ReactDOM.render(
  <Provider store={store}>
    <FormApp />
  </Provider>,
  document.getElementById('root')
)
