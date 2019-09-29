import { newLesson } from '../schema/lesson';

const createLessons = (length, lessonList) => {
  let newList = lessonList;
  const iteration = makePositive(lessonList.length - length);

  if (!lessonList.length) {
    for (let i = 0; i < length; i++) {
      newList.push(new newLesson());
    }
    return newList;
  }

  if (lessonList.length - length > 0) {
    for (let i = 0; i < iteration; i++) {
      newList.pop();
    }
  } else {
    for (let i = 0; i < iteration; i++) {
      newList.push(new newLesson());
    }
  }

  return newList;
};

const makePositive = number => {
  if (number > 0) {
    return number;
  }
  return number * -1;
};

export default createLessons;
