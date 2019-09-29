const handleErrorText = errors => {
  const filteredErrors = errors.filter(item => item !== null);
  let errorText = '';
  const { length } = filteredErrors;

  if (length === 1) {
    return length + ' numaralı dersin kredisinde sadece rakam kullanınız.';
  }

  filteredErrors.forEach(error => {
    errorText += error.index + 1 + ' ';
  });

  return errorText + 'numaralı derslerin kredilerinde sadece rakam kullanınız.';
};

export default handleErrorText;
