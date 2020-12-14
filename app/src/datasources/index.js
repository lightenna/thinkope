import GithubDatasource from "./GithubDatasource";
import TestDatasource from "./TestDatasource";

const index = {};
[ GithubDatasource, TestDatasource].map((source, i) => {
    if (source.key) {
        index[source.key] = source;
    }
});
export default index;

// abstract each storage and retrieval schema
export const find = (key, errorHandler) => {
    if (index[key]) {
        // return each datasource as an instantiated Datasource object
        return Object.assign(new index[key](), {
            errorHandler: errorHandler,
        });
    } else {
        errorHandler(new Error('no such datasource'));
    }
};
