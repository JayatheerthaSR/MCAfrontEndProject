
const setDate = () => {
    const date = new Date();
    var currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

    const startDate = document.getElementById('startDate');
    startDate.setAttribute("min", currentDate);

    startDate.addEventListener("input", () => {
        let edate = startDate.value.split("-");
        var newDate = edate[0]+"-"+edate[1]+"-"+(Number(edate[2])+1);
        const endDate = document.getElementById('endDate');
        endDate.setAttribute("min", newDate);
        endDate.removeAttribute('disabled');
    })
}

const formSubmit = (e) => {
    e.preventDefault();
    const dialog = document.getElementById('formModal');
        dialog.showModal();
        document.getElementById('ok').addEventListener('click', (e) => { 
            dialog.close();
        });
}

window.onload = setDate;

const description = document.getElementById("description");
description.addEventListener("keyup",() => {
    document.getElementById("charCount").innerText = description.value.length;
});
document.getElementById("book").addEventListener("keypress", (e) => { 
    if(e === "enter") formSubmit(e);
})