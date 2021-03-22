import React, {Component} from 'react';
import PropTypes from "prop-types";
import Editor from "rich-markdown-editor";

class OutlineRichMarkdownEditor extends Component {

    constructor(props) {
        super(props);
        // bind local event handlers
        this.handleEditorChange = this.handleEditorChange.bind(this);
        // initialise state
        this.state = {
            // non-text state
        };
        this.change_timeout = null;
    }

    componentDidMount() {
    }

    handleEditorChange(serialise_function) {
        const time_after_last_change_to_action = 500; // ms
        if (this.change_timeout != null) {
            clearTimeout(this.change_timeout);
        }
        // create a timeout to process editor change shortly after last change in stream
        const that = this;
        this.change_timeout = setTimeout(() => {
            // Prosemirror returns a function to request a serialisation of the document
            const value = serialise_function();
            // call Redux action to update other views
            that.props.updateValue(value);
        }, time_after_last_change_to_action);
    }

    render() {
        return (
            <div className="orme-editor editor" onClick={this.focus}>
                <Editor
                    onChange={this.handleEditorChange}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                />
            </div>
        );
    }

    static get characteristics() {
        return {
            focusable: true
        };
    }

    static get propTypes() {
        return {
            view: PropTypes.object.isRequired,
            editorState: PropTypes.object.isRequired,
        };
    }
}

export default OutlineRichMarkdownEditor;
