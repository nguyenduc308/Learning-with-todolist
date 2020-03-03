import React, { Component } from 'react'
class Grid extends Component {
    render() {
        return (
            <div className="grid wide">
                {this.props.children}
            </div>
        )
    }
}

export default Grid
