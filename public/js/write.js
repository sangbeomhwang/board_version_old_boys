

const token = document.cookie.split("=")[1].replace(/"/g, '')
console.log(token)
const writerInput = document.querySelector('#writer');

if (token) {
  writerInput.value = token;
}



const writeFrm = document.querySelector("#writeFrm");

submitHandler = (event) => {
  const subject = event.target.subject.value;
  const writer = event.target.writer.value;
  // const content = event.target.content.value;


const contentDiv = document.querySelector(".ProseMirror");
const contentValue = contentDiv.innerHTML;
// const imageElement = document.createElement('img');
// imageElement.src = 'data:image/png;base64, shortened base64-encoded text here';
// contentDiv.appendChild(imageElement);

// console.log(contentDiv);
// console.log(contentValue);
event.target.content.value = contentValue;

  try {
    if (!subject || !writer || !content) {
      throw new Error("빈 칸에 내용을 입력해주세요");
    }
  } catch (e) {
    alert(e);
    event.preventDefault();
  }
}

writeFrm.addEventListener("submit", submitHandler);



const cancelBtn = document.querySelector(".cancel")

cancelBtn.addEventListener("click", (e)=>{
  window.location.href = `http://127.0.0.1:3000/board/list?index=0`;
})



console.log(hiddenIdx.value)