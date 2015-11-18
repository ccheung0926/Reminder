  var modifyClicked = true;
window.onload  = function(){
  var ul = document.getElementById("list");
  if(window.localStorage["listing"] === []){
    return;
  }
  if(window.localStorage["listing"] === undefined){
    var data = ["Pick up food", "clean up"];
    window.localStorage["listing"] = JSON.stringify(data);
  }
  var list = JSON.parse(window.localStorage["listing"]);
  for(var i = 0; i < list.length; i++){
    var id = i.toString();
    var iI = document.createElement("i");
    var  li = document.createElement("li");
      li.id = id;
      iI.id = id + "sub";
      iI.className = "icon";
      li.className = "myList";
      li.innerHTML = list[i];
      iI.innerHTML = "X";
      iI.addEventListener("click",erase,false);
      iI.style.visibility = "hidden";
      li.setAttribute("contentEditable", true);
      li.setAttribute("onkeyup", 'edited(this, event)');
      li.appendChild(iI);
      ul.appendChild(li); 
  }
};


function edited(el,event){
  var li = document.getElementById(el.id);
  var index = parseInt(el.id);
  var list = JSON.parse(window.localStorage["listing"]);
  if(event.keyCode === 13){
    var next = (index+1).toString();
    if(next >= list.length){
      addItem();
    }
    else{
      var nextLi = document.getElementById(next);
      nextLi.focus();
    }   
  }
  else{
    var i = document.getElementById(el.id+"sub")
    var str = "";
    str += li.innerHTML;
    var arr = str.split("")
    arr.splice(-49);
    list[index] = arr.join("");
    localStorage.setItem("listing", JSON.stringify(list));
  }
};  

function modify(id){
    var li = document.getElementsByClassName("myList");
    var div = document.getElementById(id);
    for(var i = 0; i < li.length; i++){
      if(modifyClicked){
        li[i].setAttribute("contentEditable", false);
        setVisibility(modifyClicked);
      }
      else{
        li[i].setAttribute("contentEditable", true); 
        setVisibility(modifyClicked);
      }
    }
    if(modifyClicked){
      modifyClicked = false;      
      div.innerHTML = "Done";
    }
    else{
      modifyClicked = true;
      div.innerHTML = "Edit";
    }
}

function setVisibility(visOrHidden){
  var iI = document.getElementsByTagName("i");
  for(var i = 0; i < iI.length; i++){
    if(visOrHidden){
      iI[i].style.visibility = "visible";
    }
    else{
      iI[i].style.visibility = "hidden";
    }
  }
}

function erase(event){
  var id = event.toElement.id.toString();
  var liIndex = id.slice(0, -3);
  var li = document.getElementById(liIndex);
  var ul = document.getElementById("list");
  ul.removeChild(li);
  reassignId();
  var list = JSON.parse(window.localStorage["listing"]);
  list.splice(liIndex,1);
  localStorage.setItem("listing", JSON.stringify(list));
}

function reassignId(){
  var li = document.getElementsByClassName("myList");
  for(var i = 0; i < li.length; i++){
    li.id = i.toString();
  }
}


function addItem(){
  var ul = document.getElementById("list");
  var newLi = document.createElement("li");
  var list =  JSON.parse(window.localStorage["listing"]);
  var newIndex = list.length;
  newLi.id = newIndex.toString();
  ul.appendChild(newLi);
  newLi.setAttribute("contentEditable", true);
  newLi.setAttribute("onkeyup", 'edited(this,event)');
  newLi.className = "myList";
  list[newIndex] = newLi.innerHTML;
  localStorage.setItem("listing", JSON.stringify(list));
  newLi.focus();  
  addIElement();
}

function addIElement(){
  var l = document.getElementsByTagName("li");
  var i = document.createElement("i");
  i.innerHTML = "X";
  i.className = "icon";
  i.style.visibility = "hidden";
  l[l.length-1].appendChild(i);
}









