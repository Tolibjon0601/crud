document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = "http://localhost:3600/photos";

  document.getElementById('create-button').addEventListener('click', async () => {
      const inputData = document.getElementById('create-input').value;
      if (inputData) {
          try {
              const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ data: inputData })
              });
              const result = await response.json();
              console.log('Created:', result);
              document.getElementById('create-input').value = '';
          } catch (error) {
              console.error('Error creating data:', error);
          }
      }
  });

  document.getElementById('read-button').addEventListener('click', async () => {
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const dataList = document.getElementById('data-list');
          dataList.innerHTML = '';
          data.forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = `ID: ${item.id}, Data: ${item.data}`;
              dataList.appendChild(listItem);
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  });

  document.getElementById('update-button').addEventListener('click', async () => {
      const id = document.getElementById('update-id').value;
      const newData = document.getElementById('update-input').value;
      if (id && newData) {
          try {
              const response = await fetch(`${apiUrl}/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ data: newData })
              });
              const result = await response.json();
              console.log('Updated:', result);
              document.getElementById('update-id').value = '';
              document.getElementById('update-input').value = '';
          } catch (error) {
              console.error('Error updating data:', error);
          }
      }
  });

  document.getElementById('delete-button').addEventListener('click', async () => {
      const id = document.getElementById('delete-id').value;
      if (id) {
          try {
              const response = await fetch(`http://localhost:3600/photos/${id}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              const result = await response.json();
              console.log('Deleted:', result);
              document.getElementById('delete-id').value = '';
          } catch (error) {
              console.error('Error deleting data:', error);
          }
      }
  });
});
