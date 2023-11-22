

    // const nav_bar_toggler = document.querySelector(".navbar-toggler");

    // // if (nav_bar_toggler) {
    // //     nav_bar_toggler.addEventListener("click", function () {
    // //         document.querySelector(".middle_background").style.backgroundColor = "blue";
    // //     });
    // // }
    



    
    function toggleDropdown(dropdownId) {
      const dropdown = document.getElementById(dropdownId);
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    function selectRole(role, action) {
      alert('Selected Role: ' + role + ' for ' + action);
      // Handle the selected role (e.g., redirect to the appropriate login or signup page)
    }

    window.onclick = function(event) {
      if (!event.target.matches('.login-dropdown button')) {
        const loginDropdown = document.getElementById('loginDropdown');
        if (loginDropdown.style.display === 'block') {
          loginDropdown.style.display = 'none';
        }
      }

      if (!event.target.matches('.signup-dropdown button')) {
        const signupDropdown = document.getElementById('signupDropdown');
        if (signupDropdown.style.display === 'block') {
          signupDropdown.style.display = 'none';
        }
      }
    }