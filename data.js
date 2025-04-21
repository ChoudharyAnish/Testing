fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  .then(res => res.json())
  .then(data => {
    const tableBody = document.querySelector('#dataTable tbody');
    data.forEach(item => {
      const row = `<tr><td>${item.id}</td><td>${item.title}</td></tr>`;
      tableBody.innerHTML += row;
    });
  });
