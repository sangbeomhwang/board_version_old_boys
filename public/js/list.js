const searchParams = new URLSearchParams(window.location.search);
const pageIndex = searchParams.get("index");
const totalList = document.querySelector(".total_article");
const totalNumber = totalList.textContent;
console.log(pageIndex)

let items = document.querySelectorAll("tbody > tr");
const paging = document.querySelector(".paging");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//paging
let lastPage = 0;
if (totalNumber % 10 == 0) {
  lastPage = parseInt(totalNumber / 10);
} else if (totalNumber % 10 != 0) {
  lastPage = parseInt(totalNumber / 10 + 1);
}

let maxLastPage = 5;
if (lastPage > maxLastPage) {
  lastPage = maxLastPage;
}

function pageTemplate() {
  let pageArr = [];
  for (let i = 0; i < lastPage; i++) {
    pageArr.push(
      `<a href="http://127.0.0.1:3000/board/list?index=${i}" class="pageMove">${
        i + 1
      }</a>`
    );
  }
  return pageArr;
}
paging.innerHTML += pageTemplate().join("");


const pageLinks = document.querySelectorAll('.pageMove');
pageLinks.forEach(v => {
  if (v.innerHTML == Number(pageIndex)+1) {
    v.style.color = '#FABE19';
  }
  else v.style.color = '#DDDDDD';
});



function prevHandler(e) {
  if (pageIndex > 0) {
    location.href =
      "http://127.0.0.1:3000/board/list?index=" + (Number(pageIndex) - 1);
  } else return alert("최신 페이지입니다.");
}

function nextHandler(e) {
  if (pageIndex < lastPage - 1) {
    location.href =
      "http://127.0.0.1:3000/board/list?index=" + (Number(pageIndex) + 1);
  } else return alert("마지막 페이지입니다.");
}
prev.addEventListener("click", prevHandler);
next.addEventListener("click", nextHandler);

let startList = Number(pageIndex) * 10;
let lastList = startList + 9;

for (let i = 0; i < items.length; i++) {
  if (i >= startList && i <= lastList) {
    items[i].style.display = "";
  } else {
    items[i].style.display = "none";
  }
}

// // 방금전 몇분전 구현
const timeLines = document.querySelectorAll("tbody > tr > td:nth-child(4)");
const timeStrings = Array.from(timeLines).map((v) => v.textContent);
const parsedTime = timeStrings.map((v) => {
  const date = new Date(v);
  let mm = date.getMonth() + 1;
  mm = (mm > 9 ? "" : "0") + mm;
  let dd = date.getDate();
  dd = (dd > 9 ? "" : "0") + dd;
  let yy = date.getFullYear();

  let hr = date.getHours();
  let mn = date.getMinutes();
  let sc = date.getSeconds();
  return [yy, mm, dd].join("-") + "." + [hr, mn, sc].join(".");
});

console.log(parsedTime);

const getTimeNow = (date) => {
  let mm = date.getMonth() + 1;
  mm = (mm > 9 ? "" : "0") + mm;
  let dd = date.getDate();
  dd = (dd > 9 ? "" : "0") + dd;
  let yy = date.getFullYear();

  let hr = date.getHours();
  let mn = date.getMinutes();
  let sc = date.getSeconds();
  return [yy, mm, dd].join("-") + "." + [hr, mn, sc].join(".");
};
const thisTime = getTimeNow(new Date());
console.log(thisTime);

parsedTime.forEach((timeLine, index) => {
  const splitTimeLine = timeLine.split(".");
  const splitThisTime = thisTime.split(".");

  if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] === splitTimeLine[1] &&
    splitThisTime[2] === splitTimeLine[2]
  ) {
    timeLines[index].innerHTML = "방금전";
  } else if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] === splitTimeLine[1] &&
    splitThisTime[2] !== splitTimeLine[2]
  ) {
    timeLines[index].innerHTML = `${splitThisTime[2] - splitTimeLine[2]}분전`;
  } else if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] - splitTimeLine[1] < 13
  ) {
    timeLines[index].innerHTML = `${splitThisTime[1] - splitTimeLine[1]}시간전`;
  } else {
    timeLines[index].innerHTML = splitTimeLine[0];
  }
});

// 검색 기능
const searchBtn = document.querySelector("#searchBox > form > div > button");
const searchInput = document.querySelector("#searchBox > form > div > input");
const searchResult = document.querySelectorAll("#btnBox > p");
const errorMessage = document.querySelector("#searchBox > form > p");

const queryString = window.location.search;
if (queryString.includes("&search")) {
  // 쿼리스트링이 &search를 포함하고 있으면 스타일 바꾸기
  searchResult[0].style.display = "none";
  searchResult[1].style.display = "block";
}

errorMessage.style.transition = "opacity 0.2s ease-in-out";
searchHandler = (event) => {
  try {
    if (searchInput.value.trim().length < 2) {
      errorMessage.style.opacity = "1";
      errorMessage.style.padding = "5px 0 0 0";
      errorMessage.style.color = "#fff";
      errorMessage.style.fontSize = "12px";
      setTimeout(() => {
        errorMessage.style.opacity = 0;
      }, 2000);
      throw new Error();
    }
  } catch (e) {
    event.preventDefault();
  }
};

searchBtn.addEventListener("click", searchHandler);
