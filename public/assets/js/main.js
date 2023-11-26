const popupModal = document.querySelector('.popup-modal');
const popupImage = document.querySelector('.popup-image');
const popupName = document.querySelector('.popup-name');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const popupContainer = document.querySelector('.popup-container');


const inputPass = document.querySelector(".popup-password");
const checkPass = document.getElementById("password");
const buttonValidate = document.getElementById("submit");

function login() {
    const blurContainer = document.querySelector('.grid-container');
    const loginButton = document.getElementById("submit");
    const navigation = document.querySelector("nav");
    const prevScroll = document.querySelector("body");
    loginButton.textContent = "Login";

    loginModal.style.color = "#0f0f0f";
    registerModal.style.color = "";

    [popupContainer, popupImage, popupModal, blurContainer,navigation, prevScroll].forEach(element => element.classList.add('active'));
    popupName.classList.remove("active");
    loginButton.setAttribute("onclick", "loginUser()");
}

function closeModal() {
    const blurContainer = document.querySelector('.grid-container');
    const navigation = document.querySelector("nav");
    const prevScroll = document.querySelector("body");
    loginModal.style.color = "";
    registerModal.style.color = "";

    [popupContainer, popupImage, popupModal, blurContainer, navigation, prevScroll].forEach(element => element.classList.remove('active'));
    popupName.classList.remove("active");
}

function register() {
    const registerButton = document.getElementById("submit");
   

    registerButton.textContent = "Register"
    registerModal.style.color = "#0f0f0f";
    loginModal.style.color = "";

    popupName.classList.add("active");
    registerButton.setAttribute("onclick", "registerUser()");
}

function loginAs() {
    const loginButton = document.getElementById("submit");
    
    const selectUser = document.getElementById("user-avatar-example");
    const fillPass = document.getElementById("password");
    const fillEmail = document.getElementById("email");
    
    selectUser.addEventListener("click", () => {
        loginButton.textContent = "Login";
        fillEmail.value = "ready@hotmail.com";
        fillPass.value = "aA1!";

        // Manually trigger the input event for the email and password fields
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        fillEmail.dispatchEvent(inputEvent);
        fillPass.dispatchEvent(inputEvent);
    });
    loginButton.setAttribute("onclick", "loginUser()");
    login();
    
}

function closeFeature() {
    const feature = document.querySelector('.popup-feature');
    const blurContainer = document.querySelector('.grid-container');

    feature.classList.remove('active');
    blurContainer.classList.remove('active');
}

function allFeatures() {
    const feature = document.querySelector('.popup-feature');
    const blurContainer = document.querySelector('.grid-container');

    feature.classList.add('active');
    blurContainer.classList.add('active');
}

function closeContact() {
    const contact = document.querySelector('.popup-contact');
    const blurContainer = document.querySelector('.grid-container');

    contact.classList.remove('active');
    blurContainer.classList.remove('active');
}

function contactPage() {
  const contact = document.querySelector('.popup-contact');
  const blurContainer = document.querySelector('.grid-container');
  
  contact.classList.add('active');
  blurContainer.classList.add('active');
}

function forgotPassword() {
    const forgotPass = document.getElementById("forgotpass");
    forgotPass.addEventListener("click", () => {
        const alerts = document.getElementById("alerting");
        const alertPopup = document.querySelector(".alert-popup");

        alertPopup.textContent = "Currently unavailable: use contact form";
        alerts.classList.add("active");

        setTimeout(() => {
            alerts.classList.remove("active");
        }, 3000);
    });
}

const checkEmail = document.getElementById("email");
const inputEmail = document.querySelector(".popup-email");
inputEmail.addEventListener("input", validateEmail);
inputEmail.addEventListener("change", validateEmail);

function validateEmail() {
    const email = checkEmail.value;
    const inputEmailClasses = inputEmail.classList;

    inputEmailClasses.remove("weak", "strong");

    switch (true) {
        case email === '':
            break;
        case email.includes("@"):
            inputEmailClasses.add("strong");
            break;
        case !email.includes("@"):
            inputEmailClasses.add("weak");
            break;
        default:
            inputEmailClasses.remove("weak", "strong");   
    }
}

inputPass.addEventListener("input", validatePassword);
inputPass.addEventListener("change", validatePassword);

function validatePassword() {
    const password = checkPass.value;
    const inputPassClasses = inputPass.classList;

    inputPassClasses.remove("weak", "medium", "strong");

    switch (true) {
        case /^[a-z]+$/.test(password):
            inputPassClasses.add("weak");
            break;
        case /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password):
            inputPassClasses.add("strong");
            break;
        case /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password):
            inputPassClasses.add("medium");
            break;
        default:
            break;
    }
}

buttonValidate.addEventListener("click", passedCredentials);

function passedCredentials(e) {
    e.preventDefault();
    const isEmailValid = inputEmail.classList.contains("strong");
    const isPasswordValid = inputPass.classList.contains("strong");

    if (!isEmailValid && !isPasswordValid) {
        var alerts = document.getElementById("alerting");
        var alertPopup = document.querySelector(".alert-popup");
        alerts.classList.add("active");
        alertPopup.textContent = "Please add in a valid email and password";

        setTimeout(() => {
            alerts.classList.remove("active");
        }, 3000);
// TODO: double check this when backend
        console.log("disabled");
    } else {
        console.log("enabled");
    }
}

// node mailer
const checkEmailContact = document.getElementById("email-contact")
const inputEmailContact = document.querySelector(".popup-email-contact");
// TODO: need to loop through second popup-email


inputEmailContact.addEventListener("input", validateContactEmail);
inputEmailContact.addEventListener("change", validateContactEmail);

function validateContactEmail() {
    const email = checkEmailContact.value;
    const inputEmailClasses = inputEmailContact.classList;

    inputEmailClasses.remove("weak", "strong");

    if (email === '') {
        // Do nothing if the email is empty
    } else if (email.includes("@")) {
        inputEmailClasses.add("strong");
    } else {
        inputEmailClasses.add("weak");
    }
}

// function sendEmail() {
//     const mailContent = document.getElementById("contact-textarea");
//     const emailAddr = document.getElementById("email-contact");
//     const sendEmail = document.getElementById("submit-contact");
//     const alerts = document.getElementById("alerting");
//     const alertPopup = document.querySelector(".alert-popup");
  
//     sendEmail.addEventListener('click', (e) => {
//       e.preventDefault();

//       const mailData = {
//         email: emailAddr.value,
//         content: mailContent.value,
//       };
  
  
//       xhr.open('POST', '/', true);
//       xhr.setRequestHeader('Content-Type', 'application/json');
  
//       xhr.onload = function() {
//         if (xhr.status >= 200 && xhr.status < 300) {

//         emailAddr.value = '';
//         mailContent.value = '';
//           Object.assign(alertPopup.style, { backgroundColor: "#baf9b8", border: "2px solid green", color: "rgb(30, 144, 15)" });

//           alertPopup.textContent = xhr.responseText;
//           alerts.classList.add("active");
  
//           setTimeout(() => {
//             alerts.classList.remove("active");
//           }, 3000);
//         } else {
//           alertPopup.textContent = xhr.status + ': '  + xhr.responseText;
//           alerts.classList.add("active");
//           setTimeout(() => {
//             alerts.classList.remove("active");
//           }, 3000);
//         }
//       };
  
//       xhr.onerror = function() {
//         alertPopup.textContent = xhr.status + ': '  + xhr.responseText;
//           alerts.classList.add("active");
//           setTimeout(() => {
//             alerts.classList.remove("active");
//           }, 3000);
//       };
  
//       xhr.send(JSON.stringify(mailData));
//     });
//   }
function succesEmail() {
    alertPopup.style.backgroundColor = "#baf9b8";
          alertPopup.style.border = "2px solid green";
          alertPopup.style.color = "rgb(30, 144, 15)";
    alertPopup.textContent = 'success';
    alerts.classList.add("active");

    setTimeout(() => {
      alerts.classList.remove("active");
    }, 3000);
}


function sendEmail() {
    const mailContent = document.getElementById("textarea-contact");
    const emailAddr = document.getElementById("email-contact");
    const sendEmail = document.getElementById("submit-contact");
    const alerts = document.getElementById("alerting");
    const alertPopup = document.querySelector(".alert-popup");
  
    sendEmail.addEventListener('click', async (e) => {
        e.preventDefault();
    
        const mailData = {
          email: emailAddr.value,
          content: mailContent.value
        };
    
        try {
          const response = await fetch('/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailData)
          });
    
          if (response.ok) {
            emailAddr.value = '';
            mailContent.value = '';
            succesEmail();
          } else {
            console.log('error');
          }
        } catch (error) {
          alertPopup.textContent = 'Error: ' + error.message;
          alerts.classList.add("active");
          setTimeout(() => {
            alerts.classList.remove("active");
          }, 3000);
        }
      });
    }


    function registerUser() {
        const nameData = document.getElementById("name");
        const emailData = document.getElementById("email");
        const passwordData = document.getElementById("password");
        const sendData = document.getElementById("submit");
      
        sendData.addEventListener("click", async (e) => {
          const userData = {
            name: nameData.value,
            email: emailData.value,
            password: passwordData.value,
            formType: 'registerForm'
          };
      
          try {
            const res = await fetch('/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData),
            
            });
      
            if (res.ok) {
                nameData.value = '';
                emailData.value = '';
                passwordData.value = '';

                window.location.href = '/dashboard';
            } else {
              console.log('error, could not send succesemail')
            }
          } catch (error) {
            error.message(error);
          }
        });
      }
    
      // function loginUser() {
      //   const emailData = document.getElementById("email");
      //   const passwordData = document.getElementById("password");
      //   const sendData = document.getElementById("submit");
      
      //   sendData.addEventListener("click", async (e) => {
      //     const userData = {
      //       email: emailData.value,
      //       password: passwordData.value,
      //       formType: 'loginForm'
      //     };
      
      //     try {
      //       const res = await fetch('/', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json'
      //         },
      //         body: JSON.stringify(userData)
      //       });
      
      //       if (res.ok) {
      //           emailData.value = '';
      //           passwordData.value = '';

                
                
      //       } else {
      //           console.log('error, could not send succesemail');
      //       }
      //     } catch (error) {
      //       alertPopup.textContent = 'Error: ' + error.message;
      //     alerts.classList.add("active");
      //     setTimeout(() => {
      //       alerts.classList.remove("active");
      //     }, 3000);
      //     }
      //   });
      // }

      async function loginUser() {
        const emailData = document.getElementById("email").value;
        const passwordData = document.getElementById("password").value;
        const userData = {
          email: emailData,
          password: passwordData,
          formType: 'loginForm'
        };
      
        try {
          const res = await fetch('/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
      
          if (res.ok) {
            // Clear the form fields
            document.getElementById("email").value = '';
            document.getElementById("password").value = '';

            window.location.href = '/dashboard';
          } else {
            console.log('Error: Could not send success email');
          }
        } catch (error) {
          alertPopup.textContent = 'Error: ' + error.message;
          alerts.classList.add("active");
          setTimeout(() => {
            alerts.classList.remove("active");
          }, 3000);
        }
      }


      
  

      