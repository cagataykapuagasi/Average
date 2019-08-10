const calculateNavigation = params => {
  let title;
  if (params.data) {
    const { listName } = params.data.item;

    if (listName) {
      title = listName;
    } else {
      title = 'İsimsiz';
    }
  } else {
    title = 'Yeni Liste';
  }

  return title;
};

export { calculateNavigation };
