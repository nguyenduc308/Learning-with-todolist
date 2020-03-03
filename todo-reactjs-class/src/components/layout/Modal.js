import React, { Component } from 'react' 
class Modal extends Component {
    _onCalcelModal = () => {
        return this.props.onCancelModal()
    }
    render() {
        return (
            <div className="modal">
                <div className="modal-mask" onClick = {this._onCalcelModal}></div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>ADD NEW TASK</h3>
                    </div>
                    <div className="modal-body">           
                            {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button 
                        className="btn-s btn-s--dark"
                        onClick = {this._onCalcelModal}
                        >Cancel</button>
                        <button 
                        className="btn-s btn-s--green"
                        onClick={this.props.addNewTask}
                        >Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
