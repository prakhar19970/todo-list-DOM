
//localStorage.setItem('tasks', JSON.stringify([]));


var formelements = document.getElementById('form');
var itemList = document.getElementById('task-list');
let taskListitems = JSON.parse(localStorage.getItem('tasks'));
let counter = 0;
refreshDom();

formelements.addEventListener('submit', addTask);


function update() {
    localStorage.setItem('tasks', JSON.stringify(taskListitems));
    refreshDom();
}

function refreshDom() {
    counter = 0;
    while (itemList.hasChildNodes()) {
        itemList.removeChild(itemList.lastChild);
    }
    const taskArray = JSON.parse(localStorage.getItem('tasks'));

    for (task of taskArray) {
        // console.log(task);

        creatingItemblock(task);
    }
}
function creatingItemblock(newTask) {

    var txtdiv = document.createElement('div');
    txtdiv.className = 'list-text';
    txtdiv.appendChild(document.createTextNode(newTask.task));
    var li = document.createElement('li');
    li.className = 'list-item';
    li.setAttribute('position', counter)
    li.draggable = true;
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checked-item'
    checkBox.checked = newTask.status;
    if (newTask.status) {
        txtdiv.style.textDecoration = "line-through";
        li.style.backgroundColor = "lightgreen";
    }
    else {
        txtdiv.style.textDecoration = "none";
        if (counter % 2 === 0) {
            li.style.backgroundColor = "rgb(226, 164, 83)";
        }
        else {
            li.style.backgroundColor = " rgb(83, 51, 10)";
        }
    }
    itemList.addEventListener('click', checkTask);
    li.appendChild(checkBox);
    li.appendChild(txtdiv);
    itemList.appendChild(li);
    var delBtn = document.createElement('button');
    delBtn.className = 'delete-button';
    delBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delBtn);
    delBtn.addEventListener('click', deleteTask);
    itemList.appendChild(li);
    itemList.addEventListener('dragstart', dragStart);
    itemList.addEventListener('dragover', dragOver);
    itemList.addEventListener('dragend', dragStop);
    counter++;
}

function addTask(obj) {
    obj.preventDefault();
    var newtask = document.getElementById('newtask').value;
    if (newtask.length) {
        taskListitems.push({ task: newtask, status: false });
    }
    else {
        alert("empty")
    }
    document.getElementById('newtask').value = "";
    // localStorage.setItem('tasks', JSON.stringify(taskListitems));
    // refreshDom();
    update();
}


function deleteTask(obj) {
    var itemtobedeleted = obj.target.parentNode;
    var x = itemtobedeleted.attributes.position.value;
    taskListitems.splice(x, 1);
    // localStorage.setItem('tasks', JSON.stringify(taskListitems));
    // refreshDom();
    update();
}

function checkTask(obj) {
    let elementStatus = 0;
    var parent = obj.target.parentNode;
    elementStatus = parent.attributes.position.value;
    console.log(parent.firstChild.checked);
    taskListitems[elementStatus].status = parent.firstChild.checked
    // localStorage.setItem('tasks', JSON.stringify(taskListitems));
    // refreshDom();
    update();
}

var startPos = 0;
var endPos = 0;
function dragStart(obj) {
    startPos = obj.srcElement;
}
function dragOver(obj) {
    obj.preventDefault();
    endPos = obj.target;
}

function dragStop(obj) {
    var s = startPos.attributes.position.value;
    var x = endPos.attributes.position.value;

    console.log(s);
    console.log(x);
    console.log(startPos.childNodes[1].textContent);
    console.log(endPos.childNodes[1].textContent);
    taskListitems[s].task = endPos.childNodes[1].textContent;
    taskListitems[s].status = endPos.childNodes[0].checked;

    taskListitems[x].task = startPos.childNodes[1].textContent;
    taskListitems[x].status = startPos.childNodes[0].checked;
    update();

}