export default function getRandomNumbers(min: number, max: number, quantity: number) {
    const numbers: number[] = [];
    let count = 0;

    while (count <= quantity) {
      const randomNumber = Math.floor(Math.random() * (max - min)) + min;

      if (!numbers.find((num) => num === randomNumber)) {
        numbers.push(randomNumber);

        count++;
      }
    }

    return numbers;
  }