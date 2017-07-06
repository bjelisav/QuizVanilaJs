

function Quiz() {
    var self = this;
    self.count = 0
    this.header = document.getElementsByTagName('h1')[0];
    this.opt1 = document.getElementById('option1');
    this.opt2 = document.getElementById('option2');
    this.opt3 = document.getElementById('option3');
    this.opt4 = document.getElementById('option4');
    this.startBtn = document.querySelector('.start');
    this.qstatBtn = document.querySelector('.qstat');
    this.confirmBtn = document.querySelector('.confirm');
    this.allOptions = document.getElementsByClassName('option');
    this.qna = {
        ques: ["Mr. Hajd je drugo ime", "Virman je", "Sta je hipopotamus", "Hemijska oznaka za zivu je:", "Sa kojom drzavom se granici Portugalija", "Ivan Lendl je osvojio koliko gren slem titula", "Ko je napisao ep Eneidu", "Grad Aleksandrija se nalazi na obali kog mora", "Popokatepetl je", "Glavni grad drzave Eritreje je", "Kako se zvao prvi zvucni film", "Koju pesmu izvodi Rambo Amadeus", "Sta se nalazi na usijanom limenom krovu", "Koje od navedenih jezera nije u Italiji", "Jacanje drzavne intervencije se naziva"],
        ans: [],
        rightAns: ["Dr.Dzekila", "Dok. za bezgotovinsko placanje", "Nilski konj", "Hg", "Spanijom","8", "Vergilije", "Sredozemnog", "Vulkan","Asmara","Pevac dzeza", "Glupi hit", "Macka", "Vener", "Etatizam"],
        wrongAns1: ["Arsena Lupena", "Reklamiranje", "Vilin konjic", "Zv", "Nemackom","9", "Dante","Crvenog", "Jezero", "Lusan","Crni pirat", "Ljudi nije fer", "Pas", "Madjore", "Elitizam"],
        wrongAns2: ["Dzeka Trboseka", "Drugo ime", "Morski konj", "Au", "Francuskom", "10", "Homer", "Jonskog", "Poluostrvo", "Talin", "Carli Caplin", "Penzija", "Papuca", "Garda", "Matizam"],
        wrongAns3: ["Ne znam", "Ne znam", "Ne znam", "Ag", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam", "Ne znam"]
    }
    this.startGame = function() {
        for (var i = 0; i < self.allOptions.length; i++) {
          self.allOptions[i].addEventListener('click',self.answerSelect);
        }
        this.startBtn.style.display = 'none';
        this.qstatBtn.style.display = 'block';
        this.header.style.fontSize = "40px";
        this.header.innerHTML = this.qna.ques[0];
        this.qstatBtn.innerHTML = 'Q: ' + (self.count + 1) + ' of ' + this.qna.ques.length;
        this.confirmAnswer();
    }
    this.answerSelect = function(e) {
        for (var i = 0; i < self.allOptions.length; i++) {
            self.allOptions[i].style.background = "rgb(73, 153, 199)"
        }
        this.style.background = "rgb(83, 199, 73)";
        self.qstatBtn.style.display = 'none';
        self.confirmBtn.style.display = 'block';
        }
    this.confirmAnswer = function() {
      var provera = true;
        for (var i = 0; i < this.allOptions.length; i++) {
            if (this.allOptions[i].style.background === "rgb(83, 199, 73)") {
              self.qna.ans.unshift(this.allOptions[i].innerHTML);
              break;
            }
        }
        for (var i = 0; i < self.qna.rightAns.length; i++) {
          if (self.qna.rightAns[i] === self.qna.ans[0]) {
            provera = false;
          }
        }
        if (provera) {
          self.qna.ans.shift();
        }
        this.showAnswers();
        for (var i = 0; i < this.allOptions.length; i++) {
            this.allOptions[i].style.background = "rgb(73, 153, 199)"
        }
        this.confirmBtn.style.display = 'none';
        this.qstatBtn.innerHTML = 'Q: ' + (self.count + 1) + ' of ' + this.qna.ques.length;
        this.qstatBtn.style.display = 'block';
        if (self.count === this.qna.ques.length) {
            self.endGame();
        } else {
            self.count += 1;
        }

        console.log(self.qna.ans);
    }
    this.endGame = function() {
        self.removeOptListener();
        self.header.innerHTML = "Imate " + self.qna.ans.length + " tacnih od " + self.qna.ques.length + " pitanja";
        self.qstatBtn.style.display = "none";
        self.startBtn.style.display = "block";
        self.qna.ans.length = 0;
        self.count = 0;

    }
    this.showAnswers = function() {
        var currentAnswers = [];
        currentAnswers.push(self.qna.rightAns[self.count]);
        currentAnswers.push(self.qna.wrongAns3[self.count]);
        currentAnswers.push(self.qna.wrongAns2[self.count]);
        currentAnswers.push(self.qna.wrongAns1[self.count]);
        randomArr = [];
        for (var i = 0; i < 4; i++) {
            randomArr.push(currentAnswers.splice(Math.floor(Math.random() * currentAnswers.length), 1));
        }
        self.header.innerHTML = self.qna.ques[self.count];
        self.opt1.innerHTML = randomArr[0];
        self.opt2.innerHTML = randomArr[1];
        self.opt3.innerHTML = randomArr[2];
        self.opt4.innerHTML = randomArr[3];
        currentAnswers.length = 0;
    }
    this.init = function() {

        this.startBtn.addEventListener('click', this.startGame.bind(this))
        this.confirmBtn.addEventListener('click', this.confirmAnswer.bind(this))
    }
    this.removeOptListener = function() {
      for (var i = 0; i < self.allOptions.length; i++) {
        self.allOptions[i].removeEventListener('click',self.answerSelect);
      }
    }
  }

    var newQuiz = new Quiz();
    newQuiz.init();
