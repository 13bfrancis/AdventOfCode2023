import { readFile } from "fs/promises";

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

export const part2 = async () => {
  const games = await getGames();
  const minCubes = games.map((game) => {
    return game.turns.reduce(
      (prev, curr) => {
        const newMins = {
          ...prev,
        };
        if (curr.blue > prev.blue) newMins.blue = curr.blue;
        if (curr.red > prev.red) newMins.red = curr.red;
        if (curr.green > prev.green) newMins.green = curr.green;

        return newMins;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );
  });

  const powerOfCubes = minCubes.map(
    (minCube) => minCube.blue * minCube.green * minCube.red
  );

  const sumOfPowers = powerOfCubes.reduce((prev, curr) => prev + curr, 0);

  return sumOfPowers;
};
