import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {  Form,  FormControl, Button } from 'react-bootstrap'
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
        this.props.onSearch(this.state.keywords)
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

export default TaskSearch
