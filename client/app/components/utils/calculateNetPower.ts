import getRandomNumbers from "./getRandomNumber";

export function calculateNetPower(generation_measurements: number[],consumption_measurements: number[] ) {
    let netPower = generation_measurements[0];

    const randomUnitsIndexes = getRandomNumbers(0, 59, 20);

    randomUnitsIndexes.forEach((index) => {
      netPower += consumption_measurements[index];
    });

    return Number(netPower.toFixed())
}