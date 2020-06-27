# Convert Seconds to Readable Format

[![npm version](https://badge.fury.io/js/sec-to-format.svg)](https://badge.fury.io/js/sec-to-format) [![Build Status](https://travis-ci.org/atayahmet/sec-to-format.svg?branch=master)](https://travis-ci.org/atayahmet/sec-to-format)

```sh
$ npm i sec-to-format --save
```

## Usage

```ts
import secToFormat from 'sec-to-format';
```

```ts
secToFormat(3601, '%H hour %s sec');
// 1 hour 1 sec
```

```ts
secToFormat(90643, '%D day %H hour %m minutes %s secs');
// 1 day 1 hour 10 minutes 43 secs
```

```ts
secToFormat(90643, '%D day %H:%m:%s');
// 1 day 1:10:43
```

## Setters

You can manipulate outputs by adding setter to the units.

```ts
const setters = {
  '%H': hour => (hour < 10 ? `0${hour}` : hour),
  '%m': min => (min < 10 ? `0${min}` : min),
};

secToFormat(7300, '%H:%m:%s');
// 2:1:40

secToFormat(7300, '%H:%m:%s', { setters });
// 02:01:40
```

## Unit Table

| Unit | Description |
| ---- | ----------- |
| %s   | Second      |
| %m   | Minute      |
| %H   | Hour        |
| %D   | Day         |
| %W   | Week        |
| %MM  | Month       |
| %Y   | Year        |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
