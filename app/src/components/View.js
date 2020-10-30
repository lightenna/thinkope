import React from 'react';
import {useParams} from "react-router-dom";
import qs from 'qs';

function View() {
    const params = useParams();
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    // derived with defaults
    const datasource = params.datasource || 'local';
    const view = query.view || 'editor';
    console.log(query);
    return (
        <div>
            <h1>View</h1>
            <ul>
                <li>I am a view of {params.path}</li>
                <li>I am a view from {datasource}</li>
                <li>I am visualised using the `{view}` view</li>
            </ul>
        </div>
    );
}

export default View;
