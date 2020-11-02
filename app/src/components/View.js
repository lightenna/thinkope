import React from 'react';
import PropTypes from 'prop-types';

class View extends React.Component {
    render() {
        return (
            <div>
                <h1>View</h1>
                <ul>
                    <li>I am a view of {this.props.path}</li>
                    <li>I am a view from {this.props.datasource}</li>
                    <li>I am visualised using the `{this.props.view.type}` view</li>
                </ul>
            </div>
        );
    }

    static get propTypes() {
        return {
            path: PropTypes.string.isRequired,
            datasource: PropTypes.string.isRequired,
            view: PropTypes.object.isRequired
        };
    }
}

export default View;
