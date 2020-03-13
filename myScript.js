function gamePlaceFactory(board) {
    let self = this;
    const sizeEl = 90;
    const lenghtLevel = 4;
    const sizePadding = 10;
    let count = 0;
    let timerId;
    let victory = false;
    let resultTime;
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,0]
        .sort(function(){
        return Math.random() - 0.5;
    });

    createBoardWrapper(board);
    drawBlock();
    setPositionBlock();


    self.getArr = function () {
        return array;
    };

    function makeCounter() {

            return ++count;
    }


   function createBoardWrapper(board){

        let divContent = document.querySelector('.content');
        let divBoardWrapper = document.createElement('div');
        divBoardWrapper.className = 'board__wrapper';
        divContent.append(divBoardWrapper);


        let divCountWrapper = document.createElement('div');
        divCountWrapper.className = 'count__wrapper';
        divBoardWrapper.append(divCountWrapper);

       let input = document.createElement("input");
       input.type = "button";
       input.value = "Start";
       input.onclick = function(e){

           self.startGame(e);
       };
       input.className = 'btn__start';
       divCountWrapper.append(input);


        let divCountTime = document.createElement('div');
        divCountTime.classList.add('count',`count__time`);
        divCountTime.setAttribute('id',`count__time__${board}`);
        divCountTime.innerHTML = '00 : 00 : 00';
        divCountWrapper.append(divCountTime);


        let divCountItem = document.createElement('div');
        divCountItem.setAttribute('class', 'count');
        divCountItem.setAttribute('id', `count__item__${board}`);
        divCountItem.innerHTML = '0';
        divCountWrapper.append(divCountItem);


        let divBoard = document.createElement('div');
        divBoard.setAttribute('id', `${board}`);
        divBoard.setAttribute('class', 'board');
        divBoardWrapper.append(divBoard);

   }

    self.drawCounterItem = function () {
        let count = document.getElementById(`count__item__${board}`);
        count.innerText = makeCounter();
    };



     self.startGame = function(e) {

         e.target.setAttribute("disabled", "disabled");
         victory = true;
          timerId = setInterval(function (){
              timer();
          },1000);
    };

     function stopTimer() {
         clearInterval(timerId);
     }

    function timer() {

        let my_timer = document.getElementById(`count__time__${board}`);
        let time = my_timer.innerHTML;
        let arr = time.split(":");
        let h = arr[0];
        let m = arr[1];
        let s = arr[2];

        if (s == 60) {
            if (m == 60) {
                if (h == 24) {
                    h = 0;
                }
                h++;
                m = 0;
                if (h < 10) h = "0" + h;
            }
            m++;
            if (m < 10) m = "0" + m;
            s = 0;
        }
        else s++;
        if (s < 10) s = "0" + s;
        document.getElementById(`count__time__${board}`).innerHTML = h+":"+m+":"+s;
        resultTime = h+":"+m+":"+s;

    }


     function drawBlock() {

        let tagBorder = document.getElementById(board);
        for(let i = 0; i < array.length ; i++){
            if(array[i] === 0) continue;
            let div = document.createElement('div');
            div.setAttribute('id', `${board}__block-${array[i]}`);
            div.className = 'block';
            div.innerHTML = `${array[i]}`;
            div.onclick =  handleEvent;
            tagBorder.append(div)
        }

    }

    function setPositionBlock() {

        let index = 1;

        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {

                let number = index;
                let row = Math.ceil(number / lenghtLevel);
                let col = Math.ceil(number % lenghtLevel);
                if (col == 0) {col = lenghtLevel;}


                if (array[index - 1] !== 0) {
                    let blockId = document.getElementById(`${board}__block-` + array[index-1]);
                    blockId.style.top = sizePadding + (row - 1) * sizeEl + 'px';
                    blockId.style.left = sizePadding + (col - 1) * sizeEl + 'px';
                }
                else if(index < 15) {
                    let blockId = document.getElementById(`${board}__block-` + array[index]);
                    blockId.style.top = sizePadding + (row - 1) * sizeEl + 'px';
                    blockId.style.left = sizePadding + (col - 1) * sizeEl + 'px';
                }

                index++;
            }

        }

    }

    function handleEvent(e){
         if(!victory) return;
         let obj = e.target;
         moveBlock(obj);


    }

    function showResult(){
        let table = document.querySelector('.table');
        table.rows[1].cells[0].innerHTML = `${resultTime}`;
        table.rows[1].cells[1].innerHTML = `${count}`;
    }


    function moveBlock(obj) {
        let i = Math.ceil(parseInt(obj.style.top) / sizeEl);
        console.log(i);
        let j = Math.ceil(parseInt(obj.style.left) / sizeEl);
        console.log(j);
        let x = parseInt(obj.style.top);
        let y = parseInt(obj.style.left);
        if (j < lenghtLevel) {
            if (array[(i - 1) * lenghtLevel + j  ] == 0) {  //ВПРАВО

                animate({
                    duration: 300,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        obj.style.left = y + progress * sizeEl + 'px';
                    }
                });
                array[(i - 1) * lenghtLevel + j ] = array[(i - 1) * lenghtLevel + j - 1 ];
                array[(i - 1) * lenghtLevel + j - 1] = 0;
                self.drawCounterItem();
            }
        }
        if (j > 1) {
            if (array[(i - 1) * lenghtLevel + j - 2] == 0) {  //left

                animate({
                    duration: 300,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        obj.style.left = y - progress * sizeEl + 'px';
                    }
                });
                array[(i - 1) * lenghtLevel + j - 2] = array[(i - 1) * lenghtLevel + j -1];
                array[(i - 1) * lenghtLevel + j -1] = 0;
                self.drawCounterItem();
            }
        }

        if (i < lenghtLevel) {
            if (array[i * lenghtLevel + j - 1] == 0) {
                animate({
                    duration: 300,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        obj.style.top = x + progress * sizeEl + 'px';
                    }
                });
                array[i * lenghtLevel + j - 1] = array[(i - 1) * lenghtLevel + j - 1];
                array[(i - 1) * lenghtLevel + j - 1] = 0;

                self.drawCounterItem();
            }
        }
        if ((i - 1) * lenghtLevel + j > lenghtLevel) {
            if (array[(i - 2) * lenghtLevel + j -1] == 0) {
                animate({
                    duration: 300,
                    timing: function(timeFraction) {
                        return timeFraction;
                    },
                    draw: function(progress) {
                        obj.style.top = x - progress * sizeEl + 'px';
                    }
                });
                array[(i - 2) * lenghtLevel + j - 1] = array[(i - 1) * lenghtLevel + j - 1];
                array[(i - 1) * lenghtLevel + j - 1] = 0;

                self.drawCounterItem();
            }
        }
        checkCompleted();

    }
    function checkCompleted() {
        let lvlComplete = true;
        for (let i = 0, j = 1; i < 15; i++, j++) {
            if (array[i] != j) {
                lvlComplete = false;
            }
        }

        if (lvlComplete) {
            victory = false;
           stopTimer();
            showResult();
            modal.style.display = "block";
        }
    }



    function animate({duration, draw, timing}) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }


}

let a = new gamePlaceFactory('board1');
// let b = new gamePlaceFactory('board2');





let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}