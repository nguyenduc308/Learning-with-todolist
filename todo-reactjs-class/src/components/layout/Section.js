import React, { Component } from 'react'
import Modal from './Modal'
import {LEVEL} from '../../constant/Task'
class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisPlayModal: false
        }
    }
    setDisplayModal = () => {
        this.props.cancelEditTask()
        this.setState({
            isDisPlayModal: !this.state.isDisPlayModal
        })    
    }

    onCancelModal = () => {
        this.setState({
            isDisPlayModal: false
        })
    }
    _addNewTask = () => {
        this.setState({
            isDisPlayModal: false
        })
        return this.props.addNewTask()
    }
    render() {
        const {isDisPlayModal} = this.state;
        const {
            level,
            content,
            setContent,
            setLevel,
        } = this.props;
        const injectedProps = {
            addNewTask: this._addNewTask,
            onCancelModal: this.onCancelModal,
        }
        return (
                <div className="row content-center">
                    <button 
                    className="btn btn-s--green"
                    onClick={this.setDisplayModal}
                    >
                        Add new task
                    </button>
                    {isDisPlayModal && <Modal {...injectedProps}>
                        <div className="form-group">
                            <input 
                            name="content" 
                            value={content} 
                            onChange={(e)=>setContent(e)} 
                            className="form-control" />
                            <div className="select-box">
                                {
                                    LEVEL.map((e,i) => {
                                        return (
                                        <div key={i}
                                        className={`
                                        select-box__item 
                                        ${e.style} 
                                        ${level===i?"selected":""}`}
                                        onClick = {()=>setLevel(i)}
                                        >{e.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Modal> }
                </div>
        )
    }
}

export default Section
