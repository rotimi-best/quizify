function getRandomNumber(limit: number): string {
  return Math.floor(Math.random() * limit).toString();
}

function filterSymbols(excludeSymbols: Array<string>, group: string) {
  let newGroup = group;
  excludeSymbols.forEach((symbol) => {
    newGroup = newGroup.replace(symbol, '');
  });

  return newGroup;
}

function createId(availableChars: Array<string>, idLength: number) {
  let id = '';

  for (let i = 0; i < idLength; i += 1) {
    // @ts-ignore
    id += availableChars[getRandomNumber(availableChars.length)];
  }

  return id;
}

export function generateUniqueId({
  length = 20,
  useLetters = true,
  useNumbers = true,
  includeSymbols = [],
  excludeSymbols = [],
} = {}) {
  let letters = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  let availableChars = [];
  let lettersArr: Array<string> = [];
  let numbersArr: Array<string> = [];

  if (useLetters) {
    if (excludeSymbols.length) letters = filterSymbols(excludeSymbols, letters);
    lettersArr = letters.split('');
  }

  if (useNumbers) {
    if (excludeSymbols.length) numbers = filterSymbols(excludeSymbols, numbers);
    numbersArr = numbers.split('');
  }

  availableChars = [...lettersArr, ...numbersArr, ...includeSymbols];

  return createId(availableChars, length);
}
