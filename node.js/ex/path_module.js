
/*
파일을 좀 더 쉽게 다룰 수 있게 해주는 모듈
운영체제마다 경로 구분자(win: \, mac: /)가 달라 path모듈로 호환성 좋게 만듦
*/
import path from 'node:path';

const string = import.meta.filename;
console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log(
  'path.basename - extname:',
  path.basename(string, path.extname(string)),
);
console.log('------------------------------');
console.log('path.parse()', path.parse(string));
console.log(
  'path.format():',
  path.format({
    dir: 'D:\\js\\04',
    name: 'path',
    ext: '.mjs',
  }),
);
console.log('path.normalize():', path.normalize('D:/js/04\\path.mjs'));
console.log('------------------------------');
console.log('path.isAbsolute(D:\\):', path.isAbsolute('D:\\:'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('------------------------------');
console.log('path.relative():', path.relative('D:\\js\\04\\path.js', 'D:\\'));
console.log(
  'path.join():',
  path.join(path.dirname(string), '..', '..', '/js', '.', '/04'),
);
console.log(
  'path.resolve():',
  path.resolve(path.dirname(string), '..', 'js', '.', '/04'),
);