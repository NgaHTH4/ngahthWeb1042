function themvaogiohang(x) {
    var arrGH = new Array();

    // Doc gio hang tu sessionStorage  
    var gh_str = sessionStorage.getItem("ssgiohang");
    if (gh_str != null) arrGH = JSON.parse(gh_str);

    // Doc tongsosp trong gio hang tu sessionStorage
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) countsp = 0;

    // Lay thong tin san pham dang chon them vao gio hang
    var boxsp = x.parentElement.children;
    var hinh = boxsp[0].children[0].src;
    var gia = boxsp[1].children[0].innerText;
    var tensp = boxsp[2].innerText;
    var soluong = parseInt(boxsp[3].value);
    var sp = new Array(hinh, tensp, gia, soluong);
    // kiem tra sp cos trong gio hang chua
    var coroi = 0;
    for (let i = 0; i < arrGH.length; i++) {
        if (arrGH[i][1] == tensp) {
            var sl = arrGH[i][3];
            sl += soluong;
            arrGH[i][3] = sl;
            coroi = 1;
            break;
        }
    }
    // Neu chua co thi them 1 dong vao cuoi array giohang
    if (coroi == 0) {
        arrGH.push(sp);
        countsp++;
    }
    // luu gio hang len sessionStorage
    sessionStorage.setItem("ssgiohang", JSON.stringify(arrGH));
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
}

function showcountsp() {
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) countsp = 0;
    document.getElementById("countsp").innerHTML = countsp;
}

function laydon() {
    // Lấy gio hang da luu trên sessionStorage về
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var ttgh = "";
    var tong = 0;
    // Tạo các dòng trong đơn hàng thể hiện trên trang
    for (let i = 0; i < giohang.length; i++) {
        var tt = giohang[i][2] * giohang[i][3];
        tong += tt;
        ttgh += `
        <tr>
            <td>${i+1}</td>
            <td><img src="${giohang[i][0]}" alt=""></td>
            <td>${giohang[i][1]}</td>
            <td>${giohang[i][2]}</td>
            <td><input type="number" min="0" max="10" value="${giohang[i][3]}" 
                                        onchange="tinhlaidon(this);"></td>
            <td>${tt}</td>
            </tr>
        `
    }
    ttgh += `
    <tr>
        <th colspan="5">Tổng đơn hàng</th>
        <th id="tongtien">${tong}</th>
    </tr>
    `
        // }
    document.getElementById("mycart").innerHTML = ttgh;
}

function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);

    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;

    var tensp = tr.children[2].innerText;
    if (sl == 0) {
        dongy = confirm("Số lượng 0 sẽ xóa sản phẩm khỏi giỏ hàng. OK?");

        if (dongy == true) {
            // Xoa tren giao dien
            tr.remove();
            // Xoa sp khoi mang
            for (let i = 0; i < giohang.length; i++) {
                if (giohang[i][1] == tensp) {
                    giohang.splice(i, 1);
                }
            }
            var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
            sessionStorage.setItem("countsp", countsp);
            showcountsp();
        } else {
            x.value = 1;
            sl = 1;
        }
    } else {
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang[i][3] = sl;
            }
        }
    }
    tt = dg * sl;
    tr.children[5].innerHTML = tt;
    tongdon += tt;
    document.getElementById("tongtien").innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
}














// function showcart() {
//     var x = document.getElementById("showcart");
//     if (x.style.display == "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
//     showmycart();
// }

// function showmycart() {
//     var ttgh = "";
//     var tong = 0;
//     for (let i = 0; i < giohang.length; i++) {
//         var tt = giohang[i][2] * giohang[i][3];
//         tong += tt;
//         ttgh += `
//         <tr>
//             <td>${i+1}</td>
//             <td><img src="${giohang[i][0]}" alt=""></td>
//             <td>${giohang[i][1]}</td>
//             <td>${giohang[i][2]}</td>
//             <td>${giohang[i][3]}</td>
//             <td>${tt}</td>
//             </tr>
//         `
//     }
//     ttgh += `
//     <tr>
//         <th colspan="5">Tổng đơn hàng</th>
//         <th>
//             <div>${tong}</div>
//         </th>
//     </tr>
//     `
//     document.getElementById("mycart").innerHTML = ttgh;
// }