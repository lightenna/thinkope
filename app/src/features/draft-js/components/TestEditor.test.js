import React from 'react';
import {render, screen} from '@testing-library/react';
import TestEditor from './TestEditor';
import {EditorState} from "draft-js";

test('shows test editor for local file', () => {
    const editor_state = EditorState.createEmpty();
    const {getByText} = render(
        <TestEditor editorState={editor_state} view={ {type: "test", datasource:"testsource", path:"/test.txt"} } />
    );
    expect(getByText(/test.txt/i)).toBeInTheDocument();
    expect(getByText(/testsource/i)).toBeInTheDocument();
});

test('shows test editor with single-line content for local file', () => {
    const magic_word = 'fish';
    const editor_state = EditorState.createWithText(magic_word);
    const {getByText} = render(
        <TestEditor editorState={editor_state} view={ {type: "test", datasource:"testsource", path:"/test.txt"} } />
    );
    expect(getByText(new RegExp(`${magic_word}`,'i'))).toBeInTheDocument();
});

test('shows test editor with multi-line content for local file', () => {
    const magic_word = 'fish';
    const editor_state = EditorState.createWithText(`${magic_word}\nfowl`);
    render(
        <TestEditor editorState={editor_state} view={ {type: "test", datasource:"testsource", path:"/test.txt"} } />
    );
    expect(screen.getAllByText(new RegExp(`"${magic_word}"`,'i'))).toHaveLength(1);;
});
