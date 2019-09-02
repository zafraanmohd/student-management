function readThis(ele)
{
    if(event.key==="Enter"||"Tab")
    {
        ele.setAttribute("value",ele.value);
    }
}

function deleteThis(rw)
{
    let table = document.getElementById("student-list");
    table.deleteRow(this);
}

let table = document.getElementById("student-list");
for(let i=0; i < table.rows.length; i++)
{
    table.rows[i].cells[9].addEventListener('click',(evt)=>
    {
        evt.preventDefault();
        let range = [0,1,2,3,4,5,6,7,8];

        if (table.rows[i].cells[9].innerText=="View/Edit")
        {
            console.log("Edit view enabled: "+i);
            for (j in range)
            {
                table.rows[i].cells[j].innerHTML='<input type="text" value="'+table.rows[i].cells[j].innerText+'" onkeydown="readThis(this)" size="7">';
            }
            let btn = table.rows[i].cells[9];
            btn.innerHTML="<button>Save</button>";
        }
        else if (table.rows[i].cells[9].innerText=="Save")
        {
            console.log("Edit view disabled: "+i);
            for (j in range)
            {
                table.rows[i].cells[j].innerHTML = table.rows[i].cells[j].getElementsByTagName("input")[0].getAttribute("value");
            }
            let btn = table.rows[i].cells[9];
            btn.innerHTML="<button >View/Edit</button>";
        }
        else
        {
            throw new Error("Data error, Refresh Page!");
        }
    });
}

for(let i=0; i < table.rows.length; i++)
{
    table.rows[i].cells[10].addEventListener('click',deleteThis);
}

addStudent = document.getElementById("addStudent");
addStudent.addEventListener('click',(evnt)=>
{
    evnt.preventDefault();
    console.log("Add new Stud!");
    let row = table.insertRow(0);
    range = [0,1,2,3,4,5,6,7,8];
    for (i in range)
    {
        let cell = row.insertCell(i);
        cell.innerHTML = table.rows[0].cells[i].innerHTML;
    }
    row.insertCell(9).innerHTML = "<button >View/Edit</button>";
    row.insertCell(10).innerHTML = "<button >Delete</button>";
    row.cells[9].addEventListener('click',(evn)=>
    {
        evn.preventDefault();
        if (row.cells[9].innerText=="View/Edit")
        {
            for (j in range)
            {
                row.cells[j].innerHTML='<input type="text" value="" onkeydown="readThis(this)" size="7">';
            }
            let btn = row.cells[9];
            btn.innerHTML="<button>Save</button>";
        }
        else if (row.cells[9].innerText=="Save")
        {
            for (j in range)
            {
                row.cells[j].innerHTML = row.cells[j].getElementsByTagName("input")[0].getAttribute("value");
            }
            let btn = row.cells[9];
            btn.innerHTML="<button >View/Edit</button>";
        }
        else
        {
            throw new Error("Data error, Refresh Page!");
        }
        row.cells[9].innerHTML = "<button >Save</button>";
    });
    row.cells[10].addEventListener('click',deleteThis);
});