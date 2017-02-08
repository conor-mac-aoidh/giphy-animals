import { CuteAnimalsPage } from './app.po';

describe('cute-animals App', function() {
  let page: CuteAnimalsPage;

  beforeEach(() => {
    page = new CuteAnimalsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
