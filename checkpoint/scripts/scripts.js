const startDate   = document.getElementById('startDate');
const endDate     = document.getElementById('endDate');
const description = document.getElementById("description");
const textChar    = document.getElementById("charCount");
const dob         = document.getElementById('reg-birth');
const terms       = document.getElementById('terms');

const dateIncrement = (d) => {
    const date = d ? new Date(d) : new Date();
    date.setDate(date.getDate() + 1);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${date.getFullYear()}-${(month > 9) ? month : "0" + String(month)}-${(day > 9) ? day : "0" + String(day)}`;
}

const setStart = () => startDate.min = dateIncrement();

const setEnd = () => {
    endDate.min = dateIncrement(startDate.value);
    endDate.disabled = false;
}

const formSubmit = (e) => {
    e.preventDefault();
    const dialog = document.getElementById('formModal');
    dialog.showModal();
    document.getElementById('ok').onclick = () => dialog.close();
}

const setCount = () => textChar.innerText = description.value.length;

const setDOB = () => {
    let tomSplit = dateIncrement().split('-');
    tomSplit[0] -= 13;
    dob.max = tomSplit.join('-');
    tomSplit[0] -= 120;
    dob.min = tomSplit.join('-');
}

const regValidate = () => {
    const register = document.querySelector('div#register form');
    const regBtn = document.querySelector("div#register button[type='submit']");
    const formGroupsReg = register.querySelectorAll('.form-control');
    
    const formGroup = Array.from(formGroupsReg);
    if(formGroup.every((el) => el.classList.contains("is-valid"))) {
        regBtn.disabled = false;
    } else {
        alert("please fill and validate all fields");
        terms.checked = false;
        regBtn.disabled = true;
    }
}

startDate.onclick   = setStart;
startDate.oninput   = setEnd;
description.onkeyup = setCount;
dob.onclick         = setDOB;
terms.onclick       = regValidate;

//JQuery

$("#packages a.btn").click(function() {
    var id = $(this).closest("div[id]").attr("id");
    $("#book select option[value="+id+"]").attr("selected", "true");
    setTimeout(function() {$("#book #numberOfPeople").focus();}, 500);
});

$(".modal .form-control").keyup(function() {
    const regex = {
        name     : /^[a-zA-Z\s]+$/,
        email    : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        phone    : /^\d{10}$/,
        password : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
    }

    var id = $(this).attr("id").split("-")[1];
    if(regex[id].test($(this).val())) $(this).addClass("is-valid").removeClass("is-invalid");
    else $(this).addClass("is-invalid").removeClass("is-valid");
});

$(".modal #reg-birth").on("input", function() {  
    if($(this).val()) $(this).addClass("is-valid").removeClass("is-invalid");
    else $(this).addClass("is-invalid").removeClass("is-valid");
});

$(".modal input[type=radio]").on("input", function() {  
    if($(this).val()) $("#reg-gender").addClass("is-valid").removeClass("is-invalid");
    else $("#reg-gender").addClass("is-invalid").removeClass("is-valid");
});


