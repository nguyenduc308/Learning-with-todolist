import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class TaskControl extends Component {
    render() {
        return (
            <>
                <Button onClick={this.props.onToggleForm}>
                    <i className="fas fa-plus"></i> Add new task
                </Button>
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sắp xếp
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <i className="fas fa-long-arrow-alt-down"></i> Name ASC
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            <i className="fas fa-long-arrow-alt-up"></i> Name DESC
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            <i className="fas fa-long-arrow-alt-down"></i> Level ASC
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            <i className="fas fa-long-arrow-alt-up"></i> Level DESC
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </>
        )
    }
}

export default TaskControl
