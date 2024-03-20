require('dotenv').config();

const env = (key) => {
  const v = process.env[key];
  if (!v) {
    throw new Error(`env variable [${key}] not found`);
  }
  return v;
};

const envNumber = (key) => {
  const v = Number(env(key));
  if (isNaN(v)) {
    throw new Error(`env variable [${key}] is NaN`);
  }
  return v;
};

module.exports = {
  env,
  envNumber,
};
