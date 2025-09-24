// api isteğinden cevap bekleme anını simüle eder
const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export default delay;
