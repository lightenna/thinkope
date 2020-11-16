import React from 'react';
import PropTypes from 'prop-types';

class EditorView extends React.Component {
    render() {
        return (
            <div className={"view type-editor"}>
                <h1>Editor view</h1>
                <ul>
                    <li>I am visualised using the `{this.props.view.type}` view</li>
                </ul>
                {this.props.sub}
            </div>
        );
    }

    static get propTypes() {
        return {
            data: PropTypes.object.isRequired,
            view: PropTypes.object.isRequired
        };
    }
}

export default EditorView;
