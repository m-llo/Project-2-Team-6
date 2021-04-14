const logout = async () => {
    await fetch('api/user/logout', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     });
     if (response.ok) {
       console.log('logout succesfful')
       //res.redirect('/');
       document.location.replace('/');
     // } else {
     //   alert(response.statusText);
     // }
   };
  };
   document.querySelector('#logout').addEventListener('submit', logout);