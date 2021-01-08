import Datasource from './Datasource';

class TestDatasource extends Datasource {

    static key = "testsource";

    getData(url) {
        // test-only datasource, so return string as a resolved promise
        return Promise.resolve('');
    }
}
export default TestDatasource;
