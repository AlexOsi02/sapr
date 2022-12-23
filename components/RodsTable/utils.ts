export const isNaNValidate = (newValue: number) => {
  if (isNaN(newValue)) {
    return {
      valid: false,
      message: "Введите число",
    };
  }
  return true;
};
