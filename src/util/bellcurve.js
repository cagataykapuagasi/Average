let sd, courseGrade, average;

const calculateBellCurve = (_sd, _courseGrade, _average) => {
  fillValues(_sd, _courseGrade, _average);
  let times = (average - courseGrade) / sd;
  const isMoreThanAverage = isPositive(times);
  times = convertPositive(times);
  let validationString = getValidation(times);
  if (validationString) {
    return validationString;
  }
  return getLetterGrade(isMoreThanAverage, times);
};

const getLetterGrade = (isMoreThanAverage, times) => {
  if (times < 1 && times > 0) {
    return 'CC';
  }

  if (isMoreThanAverage) {
    if (times >= 1 && times < 2) {
      return 'CB';
    } else if (times >= 2 && times < 3) {
      return 'BB';
    } else if (times >= 3 && times < 4) {
      return 'BA';
    } else {
      return 'AA';
    }
  } else {
    if (times >= 1 && times < 2) {
      return 'DC';
    } else if (times >= 2 && times < 3) {
      return 'DD';
    } else if (times >= 3 && times < 4) {
      return 'FD';
    } else {
      return 'FF';
    }
  }
};

const isPositive = value => {
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

const convertPositive = number => {
  if (number < 0) {
    return number * -1;
  }
  return number;
};

const getValidation = times => {
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
