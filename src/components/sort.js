import React, { Component } from 'react';

class Sort extends Component {
    render() {
        return (
            <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li role="button">
                                                <span className="fa fa-sort-alpha-asc pr-5">
                                                    Tên A-Z
                                                </span>
                                </li>
                                <li role="button">
                                                <span className="fa fa-sort-alpha-desc pr-5">
                                                    Tên Z-A
                                                </span>
                                </li>
                                <li role="separator" className="divider"></li>
                                <li>Trạng Thái Kích Hoạt</li>
                                <li role="button">Trạng Thái Ẩn</li>
                            </ul>
                        </div>
        );
    }
}

export default Sort;