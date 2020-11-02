import React from 'react';
import {useParams} from "react-router-dom";
import qs from 'qs';

function parseView(raw_view) {
    if (raw_view.indexOf('"') !== -1) {
        return JSON.parse(raw_view);
    }
    return { type: raw_view };
}

function View() {
    const params = useParams();
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    // derived with defaults
    const datasource = params.datasource || 'local';
    const view = parseView(query.view || { name: 'editor' });
    return (
        <div>
            <h1>View</h1>
            <ul>
                <li>I am a view of {params.path}</li>
                <li>I am a view from {datasource}</li>
                <li>I am visualised using the `{view.type}` view</li>
            </ul>
        </div>
    );
}

export default View;
