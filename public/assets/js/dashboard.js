//quil script
var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block', 'blockquote']
    ]
  },
  // placeholder: 'Compose an epic...',
  theme: 'snow'
});

// exportPDF script
function exportPDF() {
  var quilTitle = document.getElementById("note-title").value;
  const quillTextContent = quill.root.innerHTML;
  
  const combinedContent = `<div><h1 style="margin-bottom: 1.3rem;">${quilTitle}</h1></div><div>${quillTextContent}</div>`;

  var opt = {
  margin:       1,
  image:        { type: 'jpeg, png', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

  html2pdf().from(combinedContent).set(opt).save(`${quilTitle}.pdf`);
  console.log("clicked")
}

// exportRTF script
function exportText() {
  var quilTitle = document.getElementById("note-title").value;
  const quillTextContent = quill.root.innerHTML;
  const combinedContent = `${quilTitle}<br> ${quillTextContent}`;

  const rtfContent = convertToRtf(combinedContent) ;

  const blob = new Blob([rtfContent], { type: 'text/rtf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${quilTitle}.rtf`;
  a.click();

  URL.revokeObjectURL(url);
}

function convertToRtf(htmlContent) {
  let rtfContent = htmlContent
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' '); 

  rtfContent = rtfContent
    .replace(/<b\b[^>]*>(.*?)<\/b>/g, '\\b $1 \\b0')
    .replace(/<i\b[^>]*>(.*?)<\/i>/g, '\\i $1 \\i0')
    .replace(/<u\b[^>]*>(.*?)<\/u>/g, '\\ul $1 \\ul0');

  rtfContent = `\n${rtfContent}\n`;
  return rtfContent;
}

// dashboard script
const sharePopup = document.querySelector('.popup-share');
  const blurContainer = document.querySelector('.grid-container');

function shareMenuClose() {
  sharePopup.classList.remove('active');
  blurContainer.classList.remove('active');
  console.log('clicked')
}

function shareMenu() {
  sharePopup.classList.add('active');
  blurContainer.classList.add('active');
  console.log('clicked')
}

// function demoFeature() {
//   const demoItems = document.querySelectorAll(".demopass");
//   demoItems.forEach(item => {
//     item.addEventListener("click", () => {
//       var alerts = document.getElementById("alerting");
//       var alertPopup = document.querySelector(".alert-popup");
//       alertPopup.textContent = "Currently unavailable: [Demo App]";
//       alerts.classList.add("active");

//       setTimeout(() => {
//         alerts.classList.remove("active");
//       }, 3000);
//     });
//   });
// }


function demoFeature() {
  const demoItems = document.querySelectorAll(".demopass");
  demoItems.forEach((item, index) => {
    if (index !== demoItems.length - 1) {
      item.addEventListener("click", () => {
        var alerts = document.getElementById("alerting");
        var alertPopup = document.querySelector(".alert-popup");
        alertPopup.textContent = "Currently unavailable: [Demo App]";
        alerts.classList.add("active");

        setTimeout(() => {
          alerts.classList.remove("active");
        }, 3000);
      });
    }
  });
}


async function handleFileSelect(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const response = await fetch('/upload-profile-images', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    document.getElementById('user-avatar-img').src = data.imageUrl;
  } catch {
    console.log('Error uploading profile image');
  }
}


// document.getElementById('new_note').addEventListener('click', async function(e) {
//   e.preventDefault();

//   const blogTitle = document.getElementById('note-title');
//   const blogContent = quill.getContents();

// const contentText = extractContentText(blogContent); // Replace with the actual method to extract content


//   const blogData = {
//     title: blogTitle.value,
//   };
//   try {
//     const response = await fetch('/createBlog', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(blogData)
//     });

//     if (response.ok) {
//       console.log('Nieuwe blog aangemaakt!');
//       blogTitle.value = 'HelloWorld';
//     } else {
//       console.error('Fout bij het aanmaken van de blog');
//     }
//   } catch (error) {
//     console.error('Fout bij het aanmaken van de blog:', error);
//   }
// });

function extractContentText(blogContent) {
  // Replace this with the actual method to extract content text from the blogContent object
  // For example, if blogContent is an object with a 'text' property, you can return blogContent.text
  return blogContent.text;
}


document.getElementById('new_note').addEventListener('click', async function(e) {
  e.preventDefault();

  const blogTitle = document.getElementById('note-title');
  const blogContent = quill.getContents();
  const contentText = extractContentText(blogContent); // Assuming extractContentText is a function that extracts text from blogContent

  const blogData = {
    title: blogTitle.value,
    content: contentText
  };

  try {
    const response = await fetch('/createBlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    });

    if (response.ok) {
      console.log('New blog created!');
      blogTitle.value = 'Hello-World';
      quill.setText(''); 
    } else {
      console.error('Error creating the blog');
    }
  } catch (error) {
    console.error('Error creating the blog:', error);
  }
});

const userId = '...'; // Get the user's ID from the session or token
      const blogData = {
        title: 'Sample Blog',
        content: 'This is a sample blog post.',
        createdAt: new Date(),
        userId: userId // Include the userId in the blog data
      };
      
      fetch('/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Blog created:', data);
        })
        .catch(error => {
          console.error('Error creating blog:', error);
        });
