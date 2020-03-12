var inputText = document.getElementById('inputText');
inputText.focus();
var donelist = document.getElementById('donelist');
var todolist = document.getElementById('todolist');


inputText.onkeyup = function(event) {
  if (event.which == 13) {
    var itemText = inputText.value;
    itemText.replace(/(^\s*)|(\s*$)/, '');
    if (!itemText || itemText === " ") return false;
    addNewItem(todolist, itemText);
    inputText.select();
  }
};



function addNewItem(list, itemText) {
  var date = new Date();
  var id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

  var listItem = document.createElement('li');
  listItem.id = 'li_'+id;
  listItem.ondblclick = moveItem;
  var text = document.createElement('span');
  text.id = 'span_'+id;
  text.innerText = itemText;

  var pencilIcon = document.createElement('i');
  pencilIcon.className = 'fas fa-pencil-alt';
  pencilIcon.onclick = renameItem;

  var minusIcon = document.createElement('i');
  minusIcon.className = 'fa fa-minus';
  minusIcon.onclick = deleteItem;


  listItem.addEventListener('mouseover', mouseover);
  listItem.addEventListener('mouseout', mouseout);

  listItem.appendChild(minusIcon);
  listItem.appendChild(text);
  listItem.appendChild(pencilIcon);
  list.appendChild(listItem);
}


function moveItem() {
  if(this.parentElement==donelist) {
    todolist.appendChild(this);
  } else {
    donelist.appendChild(this);
  }
}


function deleteItem() {
  this.parentElement.style.display="none";
}

function updateItemStatus() {
  var chId = this.id.replace('cb_',"");
  var text = document.getElementById('span_'+chId);
  if(this.checked) { text.className = 'checked'; }
  else { text.className = ''; }
}

function renameItem() {
  var newText = prompt("What should this item be renamed to?")
  if (!newText || newText === " ") return false;
  this.previousSibling.innerText = newText;
}


function removeItem() {
  this.style.display = "none";
}

function mouseover() {
  this.firstChild.style.visibility = 'visible';
  this.lastChild.style.visibility = 'visible';
}

function mouseout() {
  this.firstChild.style.visibility = 'hidden';
  this.lastChild.style.visibility = 'hidden';
}
