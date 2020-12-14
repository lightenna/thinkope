import nodeFetch from 'node-fetch';

class Datasource {

    // abstract class because no static 'key' property
    base = '';
    param_whitelist = [];

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
        return nodeFetch(url)
            .then((response) => response.text())
            .then((text) => this.filterData(text))
            .catch((err) => {
                this.errorHandler(err);
            });
    }
}

export default Datasource;