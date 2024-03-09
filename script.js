const draggble_list = document.querySelector(".draggable-list");
const check = document.getElementById("check");

const richest_people = [
  "Elon Musk",
  "Bill Gates",
  "Jeff Bezzos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jack Ma",
  "Sergey Brin",
  "Larry Page",
  "Warren Buffet",
  "Bernard Arnault",
];
const listItems = [];
let dragStartIndex;

function createList() {
  richest_people
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((person1, person2) => {
      return person1.sort - person2.sort;
    })
    .map((person) => {
      return person.value;
    })
    .forEach((person, idx) => {
      // console.log(person);
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", idx);
      listItem.innerHTML = `
    <span  class="number"> ${idx + 1} </span>
    <div class="draggable" draggable="true">
    <p class="person-name"> ${person} </p>
    <i class="fa fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggble_list.appendChild(listItem);
    });

  addEventListener();
}
createList();
function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove("over");
}
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  // let count = 0;
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    if (personName !== richest_people[index]) {
      // console.log(total_count);
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
  let list_sorted = listItems.every((listItem, index) => {
    return (
      richest_people[index] ==
      listItem.querySelector(".draggable").innerText.trim()
    );
  });
  if (list_sorted) {
    console.log("List Sorted");
    console.log(document.querySelector(".check-btn").innerText);
    document.querySelector(".check-btn").innerText = "List Sorted Successfully";
  } else {
    console.log("List Unsorted");
  }
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
