export const number = (event: React.KeyboardEvent<HTMLInputElement>) => {
  let value = event.currentTarget.value;

  const numericValue = value.replace(/\D/g, '');

  event.currentTarget.value = numericValue;
};
