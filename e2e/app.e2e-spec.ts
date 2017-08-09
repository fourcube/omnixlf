import { OmnixlfPage } from './app.po';

describe('omnixlf App', () => {
  let page: OmnixlfPage;

  beforeEach(() => {
    page = new OmnixlfPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
