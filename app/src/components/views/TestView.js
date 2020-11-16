import React from 'react';
import PropTypes from 'prop-types';

class TestView extends React.Component {
    render() {
        const data = this.props.data || {
            path: 'notdefined',
            datasource: 'notdefined'
        };
        return (
            <div className={"view type-test"}>
                <h1>Test View</h1>
                <ul>
                    <li>I am a view of {data.path}</li>
                    <li>I am a view from {data.datasource}</li>
                    <li>I am visualised using the `{this.props.view.type}` view</li>
                </ul>
            </div>
        );
    }

    static get propTypes() {
        return {
            view: PropTypes.object.isRequired,
            data: PropTypes.object
        };
    }
}

export default TestView;