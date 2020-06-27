import secToFormat from '../src';

describe('secToFormat Tests', () => {
  it('Hours, Minutes, Seconds', () => {
    expect(secToFormat(3600, '%H hour')).toEqual('1 hour');
    expect(secToFormat(3600, '%H hour %m minutes')).toEqual('1 hour 0 minutes');
    expect(secToFormat(3600 + 13, '%H hour %m minutes %s secs')).toEqual(
      '1 hour 0 minutes 13 secs',
    );
    expect(secToFormat(3600 + 123, '%H hour %m minutes %s secs')).toEqual(
      '1 hour 2 minutes 3 secs',
    );
  });

  it('Days, Weeks, Months, Years', () => {
    expect(secToFormat(86400 * 3 + 122, '%D day %m minutes %s secs')).toEqual(
      '3 day 2 minutes 2 secs',
    );
    expect(secToFormat(604800 + 86400 * 3 + 122, '%W week %D day %m minutes %s secs')).toEqual(
      '1 week 3 day 2 minutes 2 secs',
    );
    expect(
      secToFormat(
        2592000 * 2 + 604800 + 86400 * 3 + 122,
        '%MM months %W week %D day %m minutes %s secs',
      ),
    ).toEqual('2 months 1 week 3 day 2 minutes 2 secs');
    expect(
      secToFormat(
        946080000 + 2592000 * 2 + 604800 + 86400 * 3 + 122,
        '%Y year %MM months %W week %D day %m minutes %s secs',
      ),
    ).toEqual('1 year 2 months 1 week 3 day 2 minutes 2 secs');
    expect(secToFormat(946080000, '%Y year %MM months %W week %D day %m minutes %s secs')).toEqual(
      '1 year 0 months 0 week 0 day 0 minutes 0 secs',
    );
  });

  it('Some variants', () => {
    expect(
      secToFormat(
        946080000 + 2592000 * 2 + 604800 + 86400 * 3 + 122,
        '%W week %MM months %Y year %D day %s secs %m minutes',
      ),
    ).toEqual('1 week 2 months 1 year 3 day 2 secs 2 minutes');

    expect(
      secToFormat(
        946080000 + 2592000 * 2 + 604800 + 86400 * 3 + 122,
        '%W %W week %MM months %Y year %D %D day %s secs %m minutes',
      ),
    ).toEqual('1 1 week 2 months 1 year 3 3 day 2 secs 2 minutes');

    expect(
      secToFormat(
        946080000 + 2592000 * 2 + 604800 + 86400 * 3 + 122,
        '%W week\n%MM months\n%Y year\n%D day\n%s secs\n%m minutes',
      ),
    ).toEqual(`1 week
2 months
1 year
3 day
2 secs
2 minutes`);
  });

  it('Setters', () => {
    const setters = {
      '%H': (v: number) => (v < 10 ? `0${v.toString()}` : v),
      '%m': (v: number) => (v < 10 ? `0${v.toString()}` : v),
      '%s': (v: number) => (v < 10 ? `0${v.toString()}` : v),
    };

    expect(secToFormat(86400 * 3 + 3600, '%D day %H:%m:%s', { setters })).toEqual('3 day 01:00:00');
  });
});
