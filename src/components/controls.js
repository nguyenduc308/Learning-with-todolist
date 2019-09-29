import React, { Component } from 'react';
import Search from './search';
import Sort from './sort';
class Controls extends Component {
    render() {
        return (
            <React.Fragment>
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Search />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Sort />
                    </div>
            </React.Fragment>
        );
    }
}

export default Controls;