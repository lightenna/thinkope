import GithubDatasource from "./GithubDatasource";
import TestDatasource from "./TestDatasource";

// convert source array into key-based object (output object, so cannot simply map)
const index = {};
[GithubDatasource, TestDatasource].forEach((source) => {
    // use static class variable to index
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
