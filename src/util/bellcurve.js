let sd, courseGrade, average;

const calculateBellCurve = (_sd, _courseGrade, _average) => {
  fillValues(_sd, _courseGrade, _average);
  let times = (average - courseGrade) / sd;
  const isMoreThanAverage = positiveControl(times);
  times = convertPositive(isMoreThanAverage, times);
  let catchE = null;
  catchE = checkNullPlaces(times);
  if (catchE) {
    return catchE;
  }
  return getLetterGrade(isMoreThanAverage, times);
};

const getLetterGrade = (isMoreThanAverage, times) => {
  if (times < 1 && times > 0) {
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
        return 'AA';
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
        return 'FF';
    }
  }
};

const positiveControl = value => {
  if (value > 0) {
    return false;
  } else {
    return true;
  }
};

const fillValues = (_sd, _courseGrade, _average) => {
  if (_sd !== null) {
    sd = _sd;
  } else if (_courseGrade !== null) {
    courseGrade = _courseGrade;
  } else {
    average = _average;
  }
};

const convertPositive = (bool, number) => {
  if (bool) {
    return number * -1;
  }
  return number;
};

const checkNullPlaces = times => {
  if (times === Infinity) {
    return 'Standart sapma 0 olamaz.';
  }
  if (!courseGrade) {
    return 'Ders notunuzu giriniz.';
  }
  if (!average) {
    return 'Sınıf ortalamasını giriniz.';
  }
  if (!sd) {
    return 'Standart sapmayı giriniz.';
  }
  return null;
};

export default calculateBellCurve;
