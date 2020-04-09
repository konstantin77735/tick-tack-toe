document.addEventListener('DOMContentLoaded', function () {
    const area = document.querySelector('.area'),
        cell = document.getElementsByClassName('cell'),
        currentPlayer = document.querySelector('.curPlayr'),

        winCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]; //выигрышные комбинации
    let player = "x",
        stat = {
            'x': 0,
            'o': 0,
            'd': 0
        };

    for (var i = 1; i <= 9; i++) {
        area.innerHTML += "<div class='cell' pos=" + i + "></div>";
    }

    for (var i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', cellClick, false);
        cell[i].addEventListener('touchstart', cellClick, false);
    }

    function cellClick() {

        var data = [];

        if (!this.innerHTML) {
            this.innerHTML = player;
        } else {
            alert("Ячейка занята");
            return;
        }
        console.log(this);
        for (let i = 0; i < cell.length; i++) {
            if (cell[i].innerHTML == player) {
                data.push(parseInt(cell[i].getAttribute('pos')));
            }
        }

        if (checkWin(data)) { // кто-то выиграл

            stat[player] += 1; // +1 победа

            restart("Выграл: " + player);
        } else {
            var draw = true;
            for (let i = 0; i < cell.length; i++) {
                console.log(`i=${i}`)
                if (cell[i].innerHTML == '') draw = false;

            }

            if (draw) {
                stat.d += 1;
                restart("Ничья");
            }
        }

        player = player == "x" ? "o" : "x";
        currentPlayer.innerHTML = player.toUpperCase();
    }

    function checkWin(data) {
        for (var i in winCases) {
            var win = true;
            for (var j in winCases[i]) {
                var id = winCases[i][j];
                var ind = data.indexOf(id);

                if (ind == -1) {
                    win = false
                }
            }

            if (win) return true;
        }
        return false;
    }

    function restart(text) {


        setTimeout(() => { 
            updateStat();

            for (var i = 0; i < cell.length; i++) {
                cell[i].innerHTML = '';
            }
            alert(text)
        }, 0);
    }

    function updateStat() {
        document.getElementById('sX').innerHTML = stat.x;
        document.getElementById('sO').innerHTML = stat.o;
        document.getElementById('sD').innerHTML = stat.d;
    }
});
