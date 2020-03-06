import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {  Form,  FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
export class TaskSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: "",
        }
    }
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
    }
    _onSearch = (e) => {
        e.preventDefault();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, ()=> {
            this.props.onSearch(this.state.keywords)
        })
    }

    render() {
        const { keywords } = this.state;
        return (
            <Form inline onSubmit={this._onSearch}>
                <FormControl 
                type="text" 
                name="keywords"
                value={ keywords }
                onChange = { this.onChange }
                placeholder="Search" 
                className="mr-sm-2" />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>
        )
    }
}
const mapStateToProps = state => ({keywords: state})
const mapDispatchToProps = dispatch => {
    return {
        onSearch: (keywords) => dispatch(actions.searchTask(keywords))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskSearch)
