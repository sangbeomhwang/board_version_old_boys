const board = require("../repository/board.repository");

exports.getList = async () => {
  const result = await board.findAll();
  return result;
};

exports.getView = async (idx) => {
  const result = await board.findOne(idx);
  return result;
};
exports.getPrev = async (idx) => {
  return await board.lastOne(idx);
};
exports.getNext = async (idx) => {
  return await board.nextOne(idx);
};

exports.postView = async (commentData) => {
    return await board.addComment(commentData)
}

exports.postWrite = async (writeData) => {
  const result = await board.submit(writeData);
  return result;
};

exports.postModify = async (writeData) => {
  const result = await board.modifyItem(writeData);
  return result;
};

// exports.postDelete = async (idx) => {
//   const result = await board.deleteItem(idx);
//   return result;
// };

exports.postDelete2 = async (commentIdx) => {
  const result = await board.deleteComment(commentIdx);
  return result;
};


exports.getDelete = async (idx) => {
  const result = await board.deleteItem(idx);
  return result;
};