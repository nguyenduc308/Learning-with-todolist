import React from 'react';
import PropTypes from 'proptypes'
const Navbar = ({title, icon}) => {
    return (
        <nav className="navbar grid">
            <div className="navbar__logo">
                <h1 id="logo"><i className={icon}></i> {title}</h1>
            </div>
            <h1><a href="https://github.com/nguyenduc308/todo-done" className="link-item"><i className="fab fa-github"></i></a></h1>
        </nav>
    )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}
Navbar.defaultProps = {
    title: "Todo List",
    icon: "fas fa-th-list"
}
export default Navbar
