import React from 'react';
import PropTypes from 'prop-types';
import {convertToRaw} from 'draft-js';

class TestEditor extends React.Component {
    render() {
        const path = this.props.view.path || 'notdefined';
        const datasource = this.props.view.datasource || 'notdefined';
        const contentState = this.props.editorState.getCurrentContent();
        const rawEditorState = convertToRaw(contentState);
        return (
            <div className={"view type-test"}>
                <h1>Test Editor</h1>
                <ul>
                    <li>I am a view of {path}</li>
                    <li>I am a view from {datasource}</li>
                    <li>I am visualised using the `{this.props.view.type}` view</li>
                </ul>
                <pre>
                {JSON.stringify(rawEditorState, null, 2)}
                </pre>
            </div>
        );
    }

    static get propTypes() {
        return {
            view: PropTypes.object.isRequired,
            editorState: PropTypes.object.isRequired,
        };
    }
}

export default TestEditor;