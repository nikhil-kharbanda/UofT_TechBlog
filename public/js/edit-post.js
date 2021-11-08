async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('').value.trim();
    const content = document.querySelector('').value.trim();
    console.log(title);
    console.log(content);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace(''); //dashboard
      } else {
        alert(response.statusText);
      }

}

// document.querySelector('').addEventListener('');