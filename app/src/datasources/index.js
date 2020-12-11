import github from "./github";
const nodeFetch = require('node-fetch');

const index = {
    [github.key]: github,
};
export default index;

// abstract each storage and retrieval schema
export const find = (key) => {
    if (index[key]) {
        // return each datasource as a Datasource object
        return Object.assign(new Datasource(), index[key]);
    } else {
        // @todo throw no_such_datasource exception
    }
};

// define a generic Datasource
class Datasource {
    getUrl(path, query) {
        const whitelisted_query_string = this.param_whitelist.filter(function (item) {
            return (query[item] !== undefined);
        }).map((item) => {
            return `${item}=${query[item]}`;
        }).join('&');
        return `${this.base}${path}?${whitelisted_query_string}`;
    }

    /**
     * filterData placeholder
     * Can be overridden by datasources to implement other filters
     * @param data
     * @return {Promise<unknown>}
     */
    filterData(data) {
        // by default, don't filter the data at all
        return Promise.resolve(data);
    }

    getData(url) {
        if (url) {
            return nodeFetch(url)
                .then((response) => response.text())
                .catch((err) => {
                    // @todo throw fetch exception
                })
                .then((text) => this.filterData(text))
                .catch((err) => {
                    // @todo throw filter exception
                });
        } else {
            // @todo throw exception
        }
    }
}
