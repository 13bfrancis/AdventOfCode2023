import { readFile } from "fs/promises";

const textToNumber = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

type Number = keyof typeof textToNumber;

const convertToNumber = (number: string) => {
  if (isNaN(+number)) {
    return textToNumber[number as Number];
  } else return number;
};

const getPuzzleInput = async () => {
  try {
    const puzzleInput = (await readFile("./input.txt")).toString();

    const input = puzzleInput.split("\n");

    return input;
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
};

const getFirstAndLast = (lines: string[]): [string, string][] => {
  return lines.map((line) => {
    const matchItr = [
      ...line.matchAll(/[1-9]/g),
      ...line.matchAll(/one/g),
      ...line.matchAll(/two/g),
      ...line.matchAll(/three/g),
      ...line.matchAll(/four/g),
      ...line.matchAll(/five/g),
      ...line.matchAll(/six/g),
      ...line.matchAll(/seven/g),
      ...line.matchAll(/eight/g),
      ...line.matchAll(/nine/g),
    ];

    const matches = [...matchItr];

    const sortedMatches = matches.toSorted(
      (a, b) => (a.index ?? 0) - (b.index ?? 0)
    );

    if (matches && matches.length > 0) {
      return [
        convertToNumber(sortedMatches.at(0)!.at(0)!),
        convertToNumber(sortedMatches.at(-1)!.at(0)!),
      ];
    }

    return ["", ""];
  });
};

const smashNumbers = (sets: [string, string][]): number[] => {
  return sets.map((set) => +`${set[0]}${set[1]}`);
};

const sumOfAll = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr, 0);

const puzzleInput = await getPuzzleInput();
const firstAndLast = getFirstAndLast(puzzleInput);
const combinedNumbers = smashNumbers(firstAndLast);

console.log(sumOfAll(combinedNumbers));
