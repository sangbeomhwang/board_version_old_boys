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

exports.postList = async (req, res) => {
  console.log('req.body :',req.body);
  const itemIdx = req.body.item_idx;
  await boardService.postList(itemIdx);
  res.redirect(`/board/list?index=0`);
}


exports.getView = async (req, res) => {
  const idx = req.query.index;
  const item = await boardService.getView(idx);
  const prevIdx = await boardService.getPrev(idx);
  const nextIdx = await boardService.getNext(idx);
  res.render("board/view.html", { item, prevIdx, nextIdx, token: req.cookies.token });
};

exports.postView = async (req, res, next) => {
    const commentData = req.body;
    await boardService.postView(commentData);
    res.redirect(`/board/view?index=${req.body.boardIdx}`);
    next()
};

exports.postLike = async (req, res) => {
  const idx = req.body.index;
  await boardService.postLike(req.body);
  res.redirect(`/board/view?index=${idx}`);
}
exports.getWrite = (req, res) => {
  res.render("board/write.html", { token: req.cookies.token });
};

exports.postWrite = async (req, res) => {
  const writeData = req.body;
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

exports.postDelete = async (req, res) => {
  const commentIdx = req.body.commentIdx;
  await boardService.postDelete(commentIdx);
  res.redirect(`/board/view?index=${req.body.boardIdx}`);
};


exports.getDelete = async (req, res) => {
  const idx = req.query.index;
  await boardService.getDelete(idx);
  res.redirect("/board/list?index=0");
}