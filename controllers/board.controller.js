const boardService = require("../services/board.service");

exports.getList = async (req, res) => {
  const searchType = req.query.searchType;
  const search = req.query.search;
  let list = await boardService.getList();
  if (searchType && search) {
    list = list.filter((obj) => obj[searchType].includes(search));
  }
  res.render("board/list.html", { list, token: req.cookies.token });
};

exports.getView = async (req, res) => {
  const idx = req.query.index;
  const item = await boardService.getView(idx);
  const prevIdx = await boardService.getPrev(idx);
  const nextIdx = await boardService.getNext(idx);
  res.render("board/view.html", { item, prevIdx, nextIdx, token: req.cookies.token });
};

exports.postView = async (req, res) => {
    const idx = req.query.index;
    const commentData = req.body;
    commentData.boardIdx = idx;
    await boardService.postView(commentData);
    res.redirect(`/board/view?index=${idx}`);
};

exports.getWrite = (req, res) => {
  res.render("board/write.html", { token: req.cookies.token });
};

exports.postWrite = async (req, res) => {
  const writeData = req.body;
  console.log(writeData);
  await boardService.postWrite(writeData);
  res.redirect("/board/list?index=0");
};

exports.getModify = async (req, res) => {
  const idx = req.query.index;
  const item = await boardService.getView(idx);
  res.render("board/modify.html", { item, token: req.cookies.token });
};

exports.postModify = async (req, res) => {
  const idx = req.query.index;
  const writeData = req.body;
  console.log(writeData);
  writeData.idx = idx;
  await boardService.postModify(writeData);
  res.redirect(`/board/view?index=${idx}`);
};

// exports.postDelete = async (req, res) => {
//   const idx = req.query.index;
//   await boardService.postDelete(idx);
//   res.redirect("/board/list?index=0");
// };

exports.postDelete2 = async (req, res) => {
  const idx = req.query.index;
  console.log(req.body);
  const commentIdx = req.body.comment_idx;
  await boardService.postDelete2(commentIdx);
  res.redirect(`/board/view?index=${idx}`);
};


exports.getDelete = async (req, res) => {
  const idx = req.query.index;
  await boardService.getDelete(idx);
  res.redirect("/board/list?index=0");
}