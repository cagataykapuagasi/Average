const calculateBellCurve = (sd, courseGrade, average) => {
  const times = (average - courseGrade) / sd;
  const isMoreThanAverage = positiveControl(times);

  return getLetterGrade(isMoreThanAverage, times);
};

const getLetterGrade = (isMoreThanAverage, times) => {
  if (times < 1) {
    return 'CC';
  }

  if (isMoreThanAverage) {
    switch (times) {
      case 1:
        return 'CB';
      case 2:
        return 'BB';
      case 3:
        return 'BA';
      case 4:
        return 'AA';
      default:
        return 'default';
    }
  } else {
    switch (times) {
      case 1:
        return 'DC';
      case 2:
        return 'DD';
      case 3:
        return 'FD';
      case 4:
        return 'FF';
      default:
        return 'default';
    }
  }
};

const positiveControl = value => {
  if (value > 0) {
    return true;
  } else {
    return false;
  }
};

export default calculateBellCurve;
