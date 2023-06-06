//select necessary elements
const form = document.querySelector(".grocery-form");
const groceryInputValue = document.querySelector(".grocery-input");
const submitBtn = document.querySelector(".submit");
const listContainer = document.querySelector(".list");
const clearBtn = document.querySelector(".clearItem");
const alert = document.querySelector(".alert");
let html;
let editElement;
let editID;
let isEdited = false;


clearBtn.style.display = "none";

/**************************************** 
 * add event listeners 
 * ************************************* */
clearBtn.addEventListener("click", clearItem);
window.addEventListener("DOMContentLoaded",setupItems);
form.addEventListener("submit", showContent);
/***************************************
 * end of Event listener 
 * ***********************************/


/********************************************
FUNCTIONS 
********** **********************************/
function showContent(e){
    e.preventDefault();
    let Id = new Date().getTime().toString();
    let value = groceryInputValue.value;
    if(value && !isEdited){
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = Id;
        element.setAttributeNode(attr);
        element.classList.add("lists");
        element.innerHTML = `<h4>${value}</h4>
            <div class="btns">
                <button class="editBtn"><i class="fas fa-edit"></i></button>
                <button class="deleteBtn"><i class="fas fa-trash"></i></button>
            </div>`;
            listContainer.appendChild(element);
            clearBtn.style.display = "block";
            const editBtn = element.querySelector('.editBtn');
            const deleteBtn = element.querySelector(".deleteBtn");
            editBtn.addEventListener("click",editItem);
            deleteBtn.addEventListener("click",deleteList);
            alerts("Added one item succsesfully", "success");

            setTimeout(function(){
              alert.textContent = "";
              alert.classList.remove("success");
            },1000)

            addToLocalStorage(Id,value);
            setBackToDefault();
    }
    else if(value && isEdited){
        editElement.innerHTML = value;
        editLocalStorage(editID, value);
        alerts("Editted the item succesfully", "success");
        setTimeout(function(){
          alert.textContent = "";
          alert.classList.remove("success");
        },1000);
        setBackToDefault();
    }
    else{
        console.log("wromg val");
        alerts("Pls Input a text","danger");
        setTimeout(function(){
          alert.textContent = "";
          alert.classList.remove("danger");
        },1000)
    }
}
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  groceryInputValue.value = editElement.innerHTML;
  submitBtn.textContent = "Edit";
  isEdited = true;
  editID = element.dataset.id;
}

function deleteList(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    alerts("Delete one item", "danger");
    setTimeout(function(){
      alert.textContent = "";
      alert.classList.remove("danger");
    },1000)
    listContainer.removeChild(element);
    const articles = document.querySelectorAll(".lists");
    console.log(articles);
    if(articles.length == 0){
      clearBtn.style.display = "none";
    }
    deleteFromLOcalStorage(id);
}
function clearItem(){
    const items = document.querySelectorAll(".lists");
    if (items.length > 0) {
      items.forEach(function (item) {
        listContainer.removeChild(item);
      });
    } 
    alerts("Cleared the items", "danger");
    setTimeout(function(){
      alert.textContent = "";
      alert.classList.remove("danger");
    },1000)
    clearBtn.style.display = "none";
    localStorage.removeItem("lists");
}

function setBackToDefault(){
    submitBtn.textContent = "submit";
    groceryInputValue.value = "";
    editID = ""
    isEdited = false;
}


function displayContent(Id,value){
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = Id;
        element.setAttributeNode(attr);
        element.classList.add("lists");
        element.innerHTML = `<h4>${value}</h4>
            <div class="btns">
                <button class="editBtn"><i class="fas fa-edit"></i>A</button>
                <button class="deleteBtn"><i class="fas fa-trash"></i>B</button>
            </div>`;
            listContainer.appendChild(element);
            const editBtn = element.querySelector('.editBtn');
            const deleteBtn = element.querySelector(".deleteBtn");
            editBtn.addEventListener("click",editItem);
            deleteBtn.addEventListener("click",deleteList);
}


function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        displayContent(item.id, item.value);
        clearBtn.style.display = "block";
      });
    }
  }

function alerts(content,typeOfalert){
alert.textContent = content;
alert.classList.add(typeOfalert);
}

/********************************************
 END OF FUNCTIONS 
********** **********************************/



/*****************************************
Local Storage Functionss 
****************************************** */
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("lists")) ? JSON.parse(localStorage.getItem("lists")) : [];
 }
 function addToLocalStorage(Id,value){
     const grocery = {Id,value};
     let items = getLocalStorage()
     items.push(grocery);
     window.localStorage.setItem("lists",JSON.stringify(items));
 }
 function editLocalStorage(id,value){
    let items = getLocalStorage();
    items = items.map(function (item) {
     if (item.Id === id) {
       item.value = value;
     }
     return item;
   });
   localStorage.setItem("lists", JSON.stringify(items));
 }
 function deleteFromLOcalStorage(id){
     let items = getLocalStorage();
     items = items.filter(function(item){
         if (item.Id != id) {
             return item;
         }
     })
     localStorage.setItem("lists", JSON.stringify(items));
 }
/*****************************************
Local Storage Functionss 
****************************************** */