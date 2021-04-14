

const logout = async () => {
    const response = await fetch('/api/user/logout', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     });
     if (response.ok) {
       console.log('logout succesfful')
       //res.redirect('/');
      //  document.location.replace('/login');
     } else {
       alert(response.statusText);
       console.log("status-text: ", response.statusText);
     }
   };

   document.querySelector('#logout').addEventListener('click', logout);