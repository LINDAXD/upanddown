//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down !!!
//랜덤번호가 > 유저번호 Up !!!
//Rest버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.


let computerNum = 0;
//랜덤번호를 저장해줄 변수
let playButton = document.getElementById("play-button"); //documen 웹사이트 자체 id를선택
//console.log(playButton); 버튼을 console로 가져옴
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");

let chances = 5
//5번
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[]
//값이 여러개 들어갈것이기 때문에 arrary


playButton.addEventListener("click",play);
//이벤트를 더해줌 / 클릭 이벤트를 더해줘라 / 플레이 함수를 더해라 
//함수를 매개변수로 넘김 / 함수가 매개변수로 들어가기 때문에 play()가 아닌 play로 들어가야 함. / 클릭시 발생할때만 발생시킬것이기 때문에 ()는 사용하지 않는다.

resetButton.addEventListener("click",reset)

userInput.addEventListener("focus",function(){
    userInput.value="";
});
//누르면 기존값이 사라짐. focus 커서가 되었을때 //익명의 함수를 씀.내용이 크게 없고 , userinput에서만 잠깐 쓰고 끝날 함수이기 때문에. 다른곳에 쓰거나 복잡할때에는 함수를 지정해줘야함. 

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    //Math.floor 소숫점 뒤에를 다 버려주는 함수
    //Math.random 0~1 랜덤 숫자를 뽑아줌(1은나오지않음)
    //0~99까지 출력이므로 마지막+1을 함으로써 1~100이 됨
    console.log("정답",computerNum);
}

function play(){
    //console.log("게임시작");
    let userValue= userInput.value; //변수에 이 값을 넣음 (내가 입력한 값을 받아옴)
   // console.log(userValue);

   if(userValue<1 || userValue>100){
    resultArea.textContent="1과 100 사이 숫자를 입력해 주세요"
    return; // 리턴을 사용해야 넘어가지않고 초기화됨
   }

   if(history.includes(userValue)){//히스토리에  userValue 값을 포함하고 있다.
    resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
   return;
   }
   //히스토리에 이미 suserValue 값이 있으면 

   chances -- ; //마이너스 마이너스 1씩 줄어든다.

   chanceArea.textContent = `남은기회 : ${chances}번`; //~(`) 백픽사용
   console.log("chance",chances);
   if(userValue<computerNum){
    resultArea.textContent = "Up!!!"
    //결과값을 보여줌 reultArea 대신 up으로 출력
    //console.log("Up!!!")
   }else if(userValue>computerNum){
    resultArea.textContent = "Down!!!"
    //결과값을 보여줌 reultArea 대신 down으로 출력
    //console.log("Down!!!")
   }else{
    resultArea.textContent = "정답입니다!!!"
    //결과값을 보여줌 reultArea 대신 정답입니다로 출력
    //console.log("정답입니다!!!")
    gameOver=true;
    //정답일 때 버튼이 비활성화됨.
   }

   history.push(userValue) //입력한 값 히스토리 배열에 저장해줌
   console.log(history);

   if(chances<1){
    gameOver=true;
   }
   if(gameOver==true){
    playButton.disabled = true;
   }
}

function reset(){
    //user input창이 깨끗하게 정리되고
    userInput.value = "";
    //새로운 번호가 생성되고
    pickRandomNum();

    resultArea.textContent="결과값이 여기 나옵니다!"

}
pickRandomNum();