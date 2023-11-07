    //    javascript for signinButton

const signinButton = document.querySelector(".signinbutton");

if (signinButton) {
    signinButton.addEventListener("click", function() {
        
        window.location.href = "login.html";
    });
}

//  javascript for signupBUtton

const signUpButton=document.querySelector(".signupbutton")

    if(signUpButton)
    {
        signUpButton.addEventListener("click",function()
        {
            window.location.href="register.html";
        });
    }

    
  // javascript for create account button

    const create_act_button=document.querySelector(".creat_act");

    if(create_act_button)
    {
        create_act_button.addEventListener("click",function()
        {
            window.location.href="register.html";
        });
    }
