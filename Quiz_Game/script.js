const Q = document.getElementsByClassName('question');
const S1 = document.getElementsByClassName('s1');
const S2 = document.getElementsByClassName('s2');
const S3 = document.getElementsByClassName('s3');
const BUTTON = document.getElementsByClassName('button');
const ANS = document.getElementsByClassName('answer');
const SCR = document.getElementsByClassName('score');

class Question{
    constructor(question, choices, answer){
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}
const PRAISE = ["GOOD JOB!","EXCELLENT WORK!!!","AMAZING!!!","KEEP IT UP!!","YOU'RE ON FIIIIRE!!"];
const QUESTIONS = [
    "What does HTML stand for?",
    "How many tags are in a regular element?",
    "What is the difference in an opening tag and a closing tag?",
    "< br  / > What type of tag is this?",
    "< body > Is this an opening tag or a closing tag?",
    "< / body > Is this an opening tag or a closing tag?",
    "Where is the meta tag only found?",
    "which is the correct way to tag an image?",
    "What is an element that does not have a closing tag called?",
    "Which of the following is an example of an empty element?",
    "What should values always be enclosed in?",
    "Where do all items for the same web site need to be saved?",
    "What does < a  h r e f = 'h t t p : / / w w w . g o o g l e . c o m'  t i t l e = ' L i n k  t o   G o o g l e  ' t a r g e t = ' _  b l a n k  ' > G o o g l e  < / a > do?",
    "What is always a welcome page, and explains the purpose or topic of the site?",
    "What does View Source do?"
]
const CHOICES = [
    ['Hyper Text Markup Language','Hot Mail','How to Make Lasagna'],
    ['2','1','3'],
    ['Opening tag has a / in front','Closing tag has a / in front','There is no difference'],
    ['Break tag','A broken one','An opening tag'],
    ['Opening','Closing',''],
    ['Opening','Closing',''],
    ['The last page','The home page','The second page'],
    ['src=”image.jpg/gif” alt=”type some text”','Src=”image.jpg/gif” alt=”type some text”',''],
    ['Tag','Empty element','Closed element'],
    ['< img / >','< img > < / img >','< / img>'],
    ['Quotation marks','Commas','Parenthesis'],
    ['In the same folder','Where ever is fine','In different folders'],
    ['Adds a link to google on the page','Adds a search engine to the page','Nothing'],
    ['Page 4','Homepage','Table of contents'],
    ['Nothing','Brings up a note pad with the HTML code already used for the site.','Opens a new website.']
]
const ANSWER = [0,0,1,0,0,1,1,0,1,0,0,0,0,1,1];
var quiz = []
var score = 0;
var streak = 0;

for(let i = 0; i < QUESTIONS.length; i++){
    quiz.push(new Question(QUESTIONS[i],CHOICES[i],ANSWER[i]))
}

let current;

function startQuiz(){
    let r = Math.floor(Math.random() * quiz.length);
     Q[0].innerHTML = quiz[r].question;
    S1[0].innerHTML = "(0) - " + quiz[r].choices[0];
    S2[0].innerHTML = "(1) - " + quiz[r].choices[1];
    if (quiz[r].choices[1] !== '') S3[0].innerHTML = "(2) - " + quiz[r].choices[2];
    console.log(quiz[r].question);
    console.log("(0) - " + quiz[r].choices[0]);
    console.log("(1) - " + quiz[r].choices[1]);
    console.log("(2) - " + quiz[r].choices[2]);
    console.log("  ");
    ANS[0].disabled = false;
    BUTTON[0].disabled = true;
    current = r;
}

function submitAnswer(r){
    let ans = '';
    while (ans ===''){
        ans = window.prompt("Enter your answer");
    }
    if(ans == 'exit'){
        score = 0;
        SCR[0].innerHTML = 0;
        Q[0].innerHTML = '';
        S1[0].innerHTML = '';
        S2[0].innerHTML = '';
        S3[0].innerHTML = '';
        ANS[0].disabled = true;
        BUTTON[0].disabled = false;
        return;
    }
    if(parseInt(ans) === quiz[current].answer) {
        score = score + 1;
        streak = streak + 1;
        SCR[0].innerHTML = score;
        if(streak %5 === 0){
            let r = Math.floor(Math.random() * PRAISE.length);
            alert('Correct! '+ streak + ' correct streak!!! '+ PRAISE[r]);
        }
        else{
            alert("Correct!");
        }
    }
    else {
        alert("Wrong! :(");
        streak = 0;
    }
    BUTTON[0].disabled = false;
    startQuiz();

}
