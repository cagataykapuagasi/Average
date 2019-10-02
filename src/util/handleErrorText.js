const handleErrorText = errors => {
  let errorText = '';
  const { length } = errors;

  if (length === 1) {
    return (
      errors[0].index +
      1 +
      ' numaralı dersin kredisinde sadece rakam kullanınız.'
    );
  }

  errors.forEach(error => {
    errorText += error.index + 1 + ' ';
  });

  return errorText + 'numaralı derslerin kredilerinde sadece rakam kullanınız.';
};

export default handleErrorText;
