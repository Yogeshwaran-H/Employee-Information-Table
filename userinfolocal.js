let sno = 1;
let userinfo = new Array();
changerow = null;
function addinfo() {
    let id = document.getElementById("emp_id").value;
    let name = document.getElementById("ename").value;
    let email = document.getElementById("email_id").value;
    let phone = document.getElementById("ephone").value;
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^[a-zA-Z0-9._%+-]+@amphisoft\.in$/
            );
    };
    if (!changerow) {
        if (id <= "AMP00000") {
            alert("Please Enter Valid Employee ID");
            return;
        }
        else if (userinfo.some((temp) => {
            return temp.id == id;
        }
        )) {
            alert("Employee ID is already existing")
            return;
        }
        else if (name == "") {
            alert("Please fill the Name");
            return;
        }
        else if (validateEmail(email) == null) {
            alert("Please Enter a valid email address");
            return;
        }
        else if (userinfo.some((temp) => {
            return temp.email == email;
        }
        )) {
            alert("Email-id is already existing")
            return;
        }
        else if (phone.length < 10) {
            alert("Phone Number is Invalid");
            return;
        }
        userinfo.push({
            "id": id,
            "name": name,
            "email": email,
            "phone": phone
        });
        localStorage.setItem("user", JSON.stringify(userinfo));
    }
    else {
        userinfo[changerow.rowIndex - 1] = {
            "id": id,
            "name": name,
            "email": email,
            "phone": phone
        };
        localStorage.setItem("user", JSON.stringify(userinfo));
        changerow = null;
    }
    disptable();
    document.getElementById("formid").reset();
}
function disptable() {
    document.getElementById("fulltable").style.display = "block";
    document.getElementById("noData").style.display = "none";
    let tablebody = document.querySelector("#tablebodyid");
    tablebody.innerHTML = '';
    let use = JSON.parse(localStorage.getItem("user"));
    use.forEach((temp) => {
        let value = Object.values(temp);
        let newrow = document.createElement("tr");
        let data = document.createElement("td");
        data.innerHTML = sno;
        newrow.appendChild(data);
        value.forEach((values) => {
            let data = document.createElement("td");
            data.innerHTML = values;
            newrow.appendChild(data);
        });
        let but = document.createElement("td");
        but.innerHTML = `<td><button onclick="editfun(this)" id="editbut"><i class="fa-solid fa-user-pen"></i></button><button onclick="deletefun(this)" id="deletebut"><i class="fa-solid fa-user-minus"></i></button></td>`;
        newrow.appendChild(but);
        tablebody.appendChild(newrow);
        sno++
    });
    sno = 1;
}
function editfun(button) {
    let editrow = button.closest("tr");
    let data = editrow.getElementsByTagName("td");
    document.getElementById("emp_id").value = data[1].textContent;
    document.getElementById("ename").value = data[2].textContent;
    document.getElementById("email_id").value = data[3].textContent;
    document.getElementById("ephone").value = data[4].textContent;
    changerow = editrow;
}
function deletefun(button) {
    let delrow = button.closest("tr");
    userinfo.splice(delrow.rowIndex - 1, 1);
    localStorage.setItem("user", JSON.stringify(userinfo));
    delrow.remove();
    if (userinfo.length == 0) {
        document.getElementById("fulltable").style.display = "none";
        document.getElementById("noData").style.display = "block";
    }
    let rowall = document.querySelectorAll("#tablebodyid tr");
    for (let i = 0; i < rowall.length; i++) {
        let rowsno = rowall[i].getElementsByTagName("td");
        rowsno[0].textContent = i + 1;
    }
}