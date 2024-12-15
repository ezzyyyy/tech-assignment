function renameColumn(data, oldName, newName) {
  return data.map((item) => {
    if (item.hasOwnProperty(oldName)) {
      item[newName] = item[oldName];
      delete item[oldName];
    }
    return item;
  });
}

function preprocessData(data) {
  const grouped = {};

  // iter through the data to group by postId
  data.forEach((item) => {
    const { postId, id, name, email, body } = item;

    // init a new post if doesnt exist
    if (!grouped[postId]) {
      grouped[postId] = {
        postId,
        id,
        mainPost: body, // first entry
        email,
        name,
        comments: [],
      };
    } else {
      // comments
      grouped[postId].comments.push({ id, name, email, body });
    }
  });

  return Object.values(grouped);
}

module.exports = { renameColumn, preprocessData };
