export const mention = (key: string) => {
  const regexp = new RegExp(`\\B@${key}\\b`);
  return (data: string) => regexp.test(data);
};
