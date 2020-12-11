const nodeFetch = require('node-fetch');

const github = {
    key: "github",
    base: "https://api.github.com",
    param_whitelist: ['ref'],
    filterData: (data_text) => {
        if (data_text) {
            // parse GitHub response to get blob URL
            const data = JSON.parse(data_text);
            if (data.git_url) {
                // fetch real data from git_url
                return nodeFetch(data.git_url)
                    .then((response) => response.text())
                    .catch((err) => {
                        // @todo throw fetch exception
                    })
                    .then((data_raw) => {
                        const data = JSON.parse(data_raw);
                        const content = data.content;
                        return atob(content);
                    })
                    .catch((err) => {
                        // @todo throw content parsing exception
                    })
            }
        }
        // if unable to process, return data unfiltered using resolved promise
        return new Promise.resolve(data_text);
    },
};
export default github;
