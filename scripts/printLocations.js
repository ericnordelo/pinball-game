async function main() {
  let rand = nextRand();

  let afterPull = rand % 100;
  let locations = [afterPull];
  console.log('locations:', locations);
}

let rand = 1337;
let rands = [rand];

for (let i = 0; i < 50; i++) {
  rand = ToUint16(Math.floor((rand * 1103515245 + 12345) / 2 ** 16));
  rands.push(rand);
}

let currentRand = 0;
function nextRand() {
  return rands[++currentRand];
}

function modulo(a, b) {
  return a - Math.floor(a / b) * b;
}
function ToUint16(x) {
  return modulo(ToInteger(x), Math.pow(2, 16));
}
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
