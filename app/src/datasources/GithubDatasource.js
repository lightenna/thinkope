import nodeFetch from 'node-fetch';
import Datasource from './Datasource';

class GithubDatasource extends Datasource {

    static key = "github";
    base = "https://api.github.com";
    param_whitelist = ['ref'];

    filterData(data_text) {
        if (data_text) {
            // parse GitHub response to get blob URL
            const data = JSON.parse(data_text);
            if (data.git_url) {
                // fetch real data from git_url
                return nodeFetch(data.git_url)
                    .then((response) => response.text())
                    .then((data_raw) => {
                        const data = JSON.parse(data_raw);
                        const content = data.content;
                        return atob(content);
                    })
                    .catch((err) => {
                        this.errorHandler(err);
                    })
            }
        }
        // if unable to process, return data unfiltered using resolved promise
        return new Promise.resolve(data_text);
    }
}
export default GithubDatasource;
