import React from 'react';
import './AppAsEmbed.scss';
import DataLoadErrorBoundary from "./boundaries/DataLoadErrorBoundary";
import DataWrapper from "./DataWrapper";

function AppAsEmbed() {
    const path = '';
    const querystr = '';
    return (
        <div className="thinkhope-embed">
            <h2>The unfashionable end of the western spiral arm....</h2>
            <DataLoadErrorBoundary>
                <DataWrapper.WrappedComponent match={{params:{path: path, url: path}}} location={{pathname: path, search: querystr}}/>
            </DataLoadErrorBoundary>
        </div>
    );
}

export default AppAsEmbed;
