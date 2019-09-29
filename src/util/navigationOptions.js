const calculateTitle = params => {
  let title;
  if (params.data) {
    const { listName } = params.data.item;

    if (listName) {
      title = listName;
    }
  } else {
    title = 'Yeni Liste';
  }

  return title;
};

export default calculateTitle;
