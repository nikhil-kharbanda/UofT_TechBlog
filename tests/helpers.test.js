const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2021-06-14 17:43:02');
  
    expect(format_date(date)).toBe('6/14/2021');
});