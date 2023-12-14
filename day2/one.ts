import { readFile } from "fs/promises";

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const getGames = async () => {
  try {
    const file = (await readFile("./input.txt")).toString();
    const lines = file.split("\n");

    return lines.map((line) => {
      return {
        game:
          line
            .match(/Game [0-9]{1,3}/g)
            ?.at(0)
            ?.replace("Game ", "") ?? "N/A",
        turns:
          line
            .split(":")
            .at(1)
            ?.split(";")
            .map((turn) => {
              return {
                red: +(turn.match(/(\d{1,}) red/)?.at(1) ?? -1),
                green: +(turn.match(/(\d{1,}) green/)?.at(1) ?? -1),
                blue: +(turn.match(/(\d{1,}) blue/)?.at(1) ?? -1),
              };
            }) ?? [],
      };
    });
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
};

export const part1 = async () => {
  const games = await getGames();

  const score = games.reduce((prev, curr) => {
    const isValidGame = curr.turns.reduce((prev, curr) => {
      if (
        curr.blue > maxCubes.blue ||
        curr.green > maxCubes.green ||
        curr.red > maxCubes.red
      ) {
        return false;
      }

      return prev;
    }, true);

    if (!isValidGame) {
      return prev;
    }

    return prev + +curr.game;
  }, 0);

  return score;
};
