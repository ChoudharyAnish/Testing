// Basic Interaction
document.getElementById("basicButton").addEventListener("click", function() {
  document.getElementById("basicResponse").innerText = "Button clicked!";
});

// Form Validation & Response
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  document.getElementById("formResponse").innerText = `Welcome, ${username}! Your email: ${email}`;
});

// AJAX Request (Fetching Data)
document.getElementById("fetchButton").addEventListener("click", function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      const post = data[0];
      document.getElementById("ajaxResponse").innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    })
    .catch(error => console.log(error));
});

// Authentication (Login/Logout)
document.getElementById("loginBtn").addEventListener("click", function() {
  localStorage.setItem("loggedIn", true);
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "block";
  document.getElementById("userModal").style.display = "block";
});

document.getElementById("logoutBtn").addEventListener("click", function() {
  localStorage.removeItem("loggedIn");
  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("userModal").style.display = "none";
});

document.getElementById("closeModalBtn").addEventListener("click", function() {
  document.getElementById("userModal").style.display = "none";
});

// Drag and Drop
const dragItem = document.getElementById("dragItem");
const dropArea = document.getElementById("dropArea");

dragItem.addEventListener("dragstart", function(event) {
  event.dataTransfer.setData("text", event.target.id);
});

dropArea.addEventListener("dragover", function(event) {
  event.preventDefault();
});

dropArea.addEventListener("drop", function(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  dropArea.appendChild(draggedElement);
});

// Real-Time Notifications
document.getElementById("sendNotification").addEventListener("click", function() {
  const notification = document.createElement("li");
  notification.innerText = "New notification at " + new Date().toLocaleTimeString();
  document.getElementById("notificationList").appendChild(notification);
});

// Dynamic Data Table (Adding Rows)
document.getElementById("addRowBtn").addEventListener("click", function() {
  const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `<td>Jane Doe</td><td>jane.doe@example.com</td>`;
});
