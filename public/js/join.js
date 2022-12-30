const valueId = document.getElementById("user_id");
const valuePw1 = document.getElementById("user_pw");
const valuePw2 = document.getElementById("user_pw2");
const valueName = document.getElementById("user_name");
const valueNick = document.getElementById("user_nick");
const valueBirth = document.getElementById("user_birth");
const valueGender = document.getElementById("user_gender");
const valueMobile = document.getElementById("user_mobile");
const valueEmail = document.getElementById("user_email");
const submitBtn = document.getElementById("join");

const alertPw1 = document.getElementById('alertpw1');
const alertPw2 = document.getElementById('alertpw2');
const alertName = document.getElementById('alertname');
const alertNick = document.getElementById('alertnick');
const alertBirth1 = document.getElementById('alertbirth1');
const alertBirth2 = document.getElementById('alertbirth2');
const alertGender = document.getElementById('alertgender');
const alertMobile = document.getElementById('alertmobile');
const alertEmail = document.getElementById('alertemail');

const submitJoinBtn = document.getElementById('confirmBtn');


function openIdCheckPopup() {
    window.open ("idcheck", "Popup Window", "height=300, width=400, top=300, left=600");
}

// ID입력값이 없으면 이벤트 발동불가 
// Value나 Length 조건부여시, 공백 및 -1 로 표시되기때문에, Trim 으로 value 공백 제거 하여 "" 와 비교할 수 있도록 지역변수 선언

submitBtn.addEventListener("submit", function(event) {
  const valueIdValue = valueId.value.trim();
  if (valueIdValue === "") {
    event.preventDefault();
  }
});


// 정규표현식 문자 정의 
// Contains at least one English uppercase letter (?=.*[A-Z])
// Contains at least one English lowercase letter (?=.*[a-z])
// Contains at least one number (?=.*\d)
// Contains at least one special character (?=.*[$@$!%*?&])
// Contains at least one Chinese character (?=.*[\u4E00-\u9FA5])
// Has a minimum length of 8 characters and maximum length of 20 characters ({8,20})

// 비밀번호 정규표현식 조건 만족
// 구현기능 
// 1. valuePw1 의 값이 영어,대소문자,숫자를 포함하여 최소 8글자 및 20글자 이내 암호 입력
// 2. 불일치할 경우, alertpw1 HTML style 속성 부여
// 3. Submit Button 조건에 따라 활성화 비활성화 결정

submitBtn.addEventListener("submit", function(event) {
  const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[a-zA-Z\d$@$!%*?&]{8,20}$/.test(value);
  if (!isValid) {
    event.preventDefault();
  }
});

valuePw1.addEventListener("keyup", function(event) {
  const value = valuePw1.value;
  const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[a-zA-Z\d$@$!%*?&]{8,20}$/.test(value);


  if(!isValid){
    alertPw1.style.display = "block";
  } else {
    alertPw1.style.display = "none";
  }
});


//비밀번호 Part 2
// 구현기능
// 1. valuePw1 과 valuePw2 의 값이 다를 경우, 불일치 HTML Style 속성 부여
// 2. Submit Button 조건에 따라 활성화 비활성화 결정
// ** ValuePw 1 과 2의 순서가 중요,
// 1이 먼저일 경우, 마지막에 입력된 값이 1이여야 조건이 완성, 2가 먼저오면 2가 마지막으로 입력된 값에 따라 조건 완성 확인

valuePw2.addEventListener("keyup", function(event) {
  const valuePw1Value = valuePw1.value;
  const valuePw2Value = valuePw2.value;
  
  if (valuePw1Value === valuePw2Value) {
    alertPw2.style.display = "none";
  } else {
    alertPw2.style.display = "block";
  }
});

submitBtn.addEventListener("submit", function(event) {
  const valuePw1Value = valuePw1.value;
  const valuePw2Value = valuePw2.value;

  if (valuePw2Value !== valuePw1Value) {
    event.preventDefault();
  }
});


//Name&Nick Area
//Length 점 표기법으로 아래와 같이 표기해야 나타남
//Name 은 String Type 이기때문.

valueName.addEventListener("keyup", function(event) {
  const valueNameLength = valueName.value.length;

  if(valueNameLength < 2){
    alertName.style.display = "block";
  } else {
    alertName.style.display = "none";
  }
});

submitBtn.addEventListener("submit", function(event){
  const valueNameLength = valueName.value.length;

  if(valueNameLength < 2){
    event.preventDefault();
  }
});


valueNick.addEventListener("keyup", function(event) {
  const valueNickLength = valueNick.value.length;

  if(valueNickLength < 2){
    alertNick.style.display = "block";
  } else {
    alertNick.style.display = "none";
  }
});

submitBtn.addEventListener("submit", function(event){
  const valueNickLength = valueNick.value.length;

  if(valueNickLength < 2){
    event.preventDefault();
  }
});

//Birth & Gender Area

valueBirth.addEventListener("change", function(event) {
  const valueBirthValue = valueBirth.value;
  const birthDate = new Date(valueBirthValue);
  const minDate = new Date("2007-01-01");
  
  if (birthDate > minDate) {
    alertBirth1.style.display = "block";
  } else {
    alertBirth1.style.display = "none";
  }

  if (valueBirthValue === null || valueBirthValue === undefined) {
    alertBirth2.style.display = "block";
  } else {
    alertBirth2.style.display = "none";
  }
});

submitBtn.addEventListener("submit", function(event) {
  const valueBirthValue = valueBirth.value;
  const birthDate = new Date(valueBirthValue);
  const minDate = new Date("2007-01-01");

  if (birthDate > minDate) {
    event.preventDefault();
  } 

  if (valueBirthValue === null || valueBirthValue === undefined) {
    event.preventDefault();
  } 
});

valueGender.addEventListener("select", function(event) {
  const valueGenderValue = valueGender.value;

  if (valueGenderValue === "남성" || valueGenderValue === "여성"){
    alertGender.style.display = "none";
  } else if (valueGenderValue === "선택"){
    alertGender.style.display = "block";
  }
});

submitBtn.addEventListener("submit", function(event) {
  const valueGenderValue = valueGender.value;

  if (valueGenderValue === "선택"){
    event.preventDefault();
  } 
});


//휴대전화 Area
// startsWith("value") 는 시작 문자를 지정.
// 만약 if 문 표현시, 아래와 같은 상황일때는 조건앞 괄호에 !를 부여하여 거짓조건을 부여할수 있음.

valueMobile.addEventListener("keyup", function(event) {
  if (valueMobile.value.startsWith("010") && valueMobile.value.length === 11) {
    alertMobile.style.display = "none";
  } else {
    alertMobile.style.display = "block";
  }
});


submitBtn.addEventListener("submit", function(event) {
  if (!(valueMobile.value.startsWith("010") && valueMobile.value.length === 11)) {
    event.preventDefault();
  } 
});


//이메일 Area
// 정규표현식 사용
// 휴대전화와 마찬가지로 If문에 !로 감싸 반대로 표현하여 코드 간소화

valueEmail.addEventListener("keyup", function(event) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (emailRegex.test(valueEmail.value)) {
    alertEmail.style.display = "none";
  } else {
    alertEmail.style.display = "block";
  }
});

submitBtn.addEventListener("submit", function(event) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!(emailRegex.test(valueEmail.value))) {
    event.preventDefault();
  } 
})