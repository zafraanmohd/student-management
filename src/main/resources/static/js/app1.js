tableBody = document.getElementById('student-list');
tableHead = document.getElementById('student-head');
window.addEventListener('load',main);
range = [0,1,2,3,4,5,6,7,8,9];
keys = ["id","rollNumber","name","grade","section","motherName","fatherName","contactNumber","mailId","address"];

function main() {
    ajaxCall("get","students/all",populateTable);
};

function addStudent(evt){
    console.log("Add Student");
    createRow(this);
}
function deleteStudent(evt) {
    console.log("Delete Student!");
    let name = this.parentElement.cells[2].innerText;
    ajaxCall("delete","students/delete/"+name,(j)=>
    {
        console.log(j);
    }
    );
    //Reload
    ajaxCall("get","students/all",populateTable);
}

function readThis(ele)
{
    if(event.key==="Enter"||"Tab")
    {
        ele.setAttribute("value",ele.value);
    }
}

function ajaxCall(methodType,url,fun,data={})
{
    data = JSON.stringify(data);
    url = "http://localhost:8080/"+url;
    let methodTypes = new Array('put','post','delete');
    console.log(methodType,url);
    const ajaxObject = new XMLHttpRequest();
    ajaxObject.open(methodType,url,true);
    if(methodTypes.includes(methodType)){ajaxObject.setRequestHeader('Content-type','application/json; charset=utf-8');}
    ajaxObject.onload = () =>{
        let json;
        try{json = JSON.parse(ajaxObject.responseText);}
        catch(e) {json = ajaxObject.responseText}
        fun(json);
    };
    ajaxObject.send(data);
}

function createRow() {
    event.preventDefault();
    let row = tableBody.insertRow(-1);

    let deleteBtn = row.insertCell(0);
    deleteBtn.innerHTML='<button>Delete</button>';
    deleteBtn.addEventListener('click',deleteStudent);

    let viewEditBtn = row.insertCell(0);
    viewEditBtn.innerHTML=`<button>Add</button>`;
    viewEditBtn.addEventListener('click',viewEdit);

    for (i in range)
    {
        if(i==0){continue;};
        row.insertCell(0).innerHTML="<input value='' onkeydown='readThis(this)' size='7'>";
    };
    let Id = row.insertCell(0);
    Id.innerHTML="";
}

function viewEdit(evt) {
    console.log("View and Edit");
    let json = {};
    let cells = this.parentElement.childNodes;
    console.log(cells)
    if(this.innerText == "View/Edit")
    {
        for(i in range)
        {
            if(i==0){continue;};
            console.log("cells[i] : ",cells[i]);
            let cellData = cells[i].innerText;
            console.log("cellData : ",cellData);
            cells[i].innerHTML = "<input value='"+cellData+"' onkeydown='readThis(this)' size='7'>";
            console.log("After change cellData : ",cells[i].innerHTML);
        }
        this.innerHTML="<button>Save</button>";
        this.addEventListener('click',viewEdit);
    }
    else if(this.innerText == "Save" || this.innerText == "Add")
    {
        console.log("Save/Add Clicked!")
        let json = {};
        for(i in keys)
        {
            if(i==0){continue;};
            let cellData = cells[i].children[0].getAttribute("value");
            console.log("Cell : ",cells[i]);
            console.log("CellData : ",cellData);
            console.log("keys-i : ",keys[i]);
            json[keys[i]] = cellData;
            cells[i].innerHTML = cellData;
        }
        console.log(json);
        if(this.innerText == "Save"){json["id"]=cells[0].innerHTML;ajaxCall("put","students/update",function(j)
        {
            console.log("Inside Update");
            console.log(j)},json);
            ajaxCall("get","students/all",populateTable);
        }
        else
         {
             json
             ajaxCall("post","students/add",function(js)
                {
                    console.log("Added");
                    console.log(js);
                    ajaxCall("get","students/all",populateTable);
                },json);
         }
        this.innerHTML="<button>View/Edit</button>";
        this.addEventListener('click',viewEdit);
        // ajaxCall("get","students/all",populateTable);
    }
    else
    {
        throw new Error("Some issue");
    }
}

function populateTable(json)
{
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
    console.log("Populating Table!")
    json.forEach((r)=>
    {
        let row = tableBody.insertRow(-1);
        for(key in keys)
        {
            if(key==0){continue;};
            row.insertCell(-1).innerHTML=r[keys[key]];
        }
        let Id = row.insertCell(0);
        Id.innerHTML=r["id"];
        Id.setAttribute("style","visibility: hidden");

        let viewEditBtn = row.insertCell(-1);
        viewEditBtn.innerHTML=`<button>View/Edit</button>`;
        viewEditBtn.addEventListener('click',viewEdit);

        let deleteBtn = row.insertCell(-1);
        deleteBtn.innerHTML="<button>Delete</button>";
        deleteBtn.addEventListener('click',deleteStudent);
    });
}