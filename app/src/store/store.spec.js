import MockDate from 'mockdate';
import configureStore from './configureStore';

describe('Store', () => {
  beforeAll(() => {
  });
  afterAll(() => MockDate.reset());

  it('should configureStore without error', () => {
    configureStore();
  });
});
