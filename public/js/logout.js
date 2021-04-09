const logout = async () => {
    await fetch('/logout', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     });
     // if (response.ok) {
     //   document.location.replace('/login');
     // } else {
     //   alert(response.statusText);
     // }
   };
   
   document.querySelector('#logout').addEventListener('submit', logout);