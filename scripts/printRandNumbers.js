async function main() {
  let rand = 1337;
  let rands = [rand];
  let bigRand = rand;

  for (let i = 0; i < 50; i++) {
    bigRand = bigRand * 1103515245 + 12345;
    rand = ToUint16(Math.floor(bigRand / 2 ** 16));
    rands.push(rand % 100);
  }

  console.log('randoms:', rands);
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
