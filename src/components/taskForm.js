import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            id:'',
            name: '',
            status: false
        }
    }
    componentWillMount() {
        const {task} = this.props;
        if(task) {
            this.setState({
                id: task.id,
                name: task.name,
                status:task.status
            })
        }
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;
        if(name === "status") {
           value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear()
    }
    onClear = () => {
        this.setState({
            name:'',
            status: false
        })
    }
    render() {
        const {id} = this.state;
        return (
            <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {id !== ''? "Cập nhật công việc": "Thêm công việc"}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input name="name" 
                                       type="text" 
                                       className="form-control"
                                       value = {this.state.name}
                                       onChange = {this.onChange}

                                />
                            </div>
                            <label>Trạng Thái :</label>
                            <select 
                                    name = "status"
                                    className="form-control" 
                                    required="required"
                                    value = {this.state.status}
                                    onChange = {this.onChange}

                            >
                                <option value={!0}>Đã xong</option>
                                <option value={!1}>Chưa xong</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

export default TaskForm;