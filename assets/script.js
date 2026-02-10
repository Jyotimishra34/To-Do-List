
const addBtn = document.getElementById("addBtn");
const titleInput = document.getElementById("taskTitle");
const detailInput = document.getElementById("taskDetails");

let todoCol = document.getElementById("todoList");
let inProgressCol = document.getElementById("inProgressList");
let done= document.getElementById("doneList");

let tasks= [];  // database in memory 

 addBtn.addEventListener("click", function(){
    const title = titleInput.value;
    const details = detailInput.value;

    if(title === "" || details === ""){
        alert("Please fill all fields");
        return;
    }

   //Create a new task object.
    const task= {
        id: Date.now(),
        title,
        details,
        status: "todo"
    };

    tasks.push(task);
    saveTasks();
    showTasks();

   //clear input boxes 
    titleInput.value = "";
    detailInput.value = "";
});


// Show Tasks on Screen (display task)
function showTasks() {

  todoCol.innerHTML = '';
  inProgressCol.innerHTML = '';
  done.innerHTML = '';

    tasks.forEach(task => { 
        const card = creatCard(task);

          if(task.status === 'todo'){
            todoCol.appendChild(card)
          }
          if(task.status == 'inProgress'){
            inProgressCol.appendChild(card)
          }

        if(task.status == 'done'){
            done.appendChild(card)
          }
        
    
});

}

function creatCard (task) {
  let card = document.createElement("div");
        card.className = "card m-2 p-2";
        card.style.backgroundColor = "bisque";
        card.setAttribute("data-id", task.id); 

        card.innerHTML= `
        <h5>${task.title}</h5>
        <p>${task.details}</p>
        
        <select onChange="changeStatus(${task.id}, this.value)">
          <option value="todo" ${task.status=="todo"?"selected":""}>ToDo</option>
          <option value="inProgress" ${task.status=="inProgress"?"selected":""}>In Progress</option>
          <option value="done" ${task.status=="done"?"selected":""}>Done</option>

          </select>
                 
    `;

    return card;
}

// Move card between column

function changeStatus(id, newStatus){

  const taskIndex = tasks.findIndex(task => task.id === id);

  if(taskIndex !== -1 ){
    tasks[taskIndex].status= newStatus;

   showTasks();

  }
}



// save task to local storage
function saveTasks(){
  localStorage.setItem('todoList', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('todoList');
  if(storedTasks) {
    tasks = JSON.parse(storedTasks);
    showTasks();

  }
}
//When the webpage is fully loaded, run the loadTasks() function
window.onload = loadTasks;