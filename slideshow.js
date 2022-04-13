var anhArr = [];
var curInd = 0;

function loadAnh() {
    for (let i = 0; i < 15; i++) {
        anhArr[i] = new Image();
        anhArr[i].src = "images/hoa" + (i + 1) + ".jpg";
        anhArr[i].src = "images/hoa" + (i + 1) + ".jpg";
    }
    document.getElementById("back").style.display = "none";
}

function next() {
    if (curInd < 16) {
        curInd++;
        document.getElementById("hoa").src = anhArr[curInd].src;
    }
    vitri();
    trangthai();
}

function back() {
    if (curInd > 0) {
        curInd--;
        document.getElementById("hoa").src = anhArr[curInd].src;
    }
    vitri();
    trangthai();
}

function vitri() {
    var str = (curInd + 1) + "/" + anhArr.length;
    document.getElementById("vitri").innerText = str;
}

function trangthai() {
    var dau = document.getElementById("back");
    var cuoi = document.getElementById("next");
    if (curInd == 0) {
        dau.style.display = "none";
        cuoi.style.display = "block";
    } else if (curInd == anhArr.length - 1) {
        cuoi.style.display = "none";
        dau.style.display = "block";
    } else {
        dau.style.display = "block";
        cuoi.style.display = "block";
    }

}