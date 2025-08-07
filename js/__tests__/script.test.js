const { JSDOM } = require('jsdom');

describe('optionSelected', () => {
  let optionSelected, state;

  beforeEach(() => {
    jest.resetModules();
    const dom = new JSDOM(`
      <body>
        <div class="option_list">
          <button class="option"><span>A</span></button>
          <button class="option"><span>B</span></button>
          <button class="option"><span>C</span></button>
          <button class="option"><span>D</span></button>
        </div>
        <footer><div class="next_btn"></div></footer>
      </body>
    `);
    global.window = dom.window;
    global.document = dom.window.document;
    global.questions = [{
      numb: 1,
      question: 'Q',
      answer: 'B',
      options: ['A','B','C','D']
    }];
    ({ optionSelected, state } = require('../script'));
    state.userScore = 0;
    state.que_count = 0;
  });

  test('increments userScore on correct answer', () => {
    const option = document.querySelectorAll('.option')[1];
    optionSelected(option);
    expect(state.userScore).toBe(1);
  });

  test('disables all options after selection', () => {
    const option = document.querySelectorAll('.option')[1];
    optionSelected(option);
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
      expect(opt.classList.contains('disabled')).toBe(true);
    });
  });
});
