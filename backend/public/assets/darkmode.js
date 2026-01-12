async function toggleDarkMode() {
    if (localStorage.getItem('darkmode') != null) {
        const dark = localStorage.getItem('darkmode');
        Darkmode_class_add_remove(dark)
    } else {
        await fetch('/darkmode', {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                console.error("Failed to send dark mode status from darkmode.js");
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((status_of) => {
            let dark = status_of.darkmode;
            localStorage.setItem('darkmode', dark);
            Darkmode_class_add_remove(dark)
        }).catch(err => {
            console.error("Error in Dark mode Js: ", err)
        })
    }
}

function sendDarkmodeStatus() {
    const darkstatus = document.querySelector('.navbar button');
    const darkmode_element_text = darkstatus.innerText;
    fetch('/darkmode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            darkmodestatus: darkmode_element_text.includes('Dark Mode'),
        })
    }).then(response => {
        if (!response.ok) {
            console.error("Failed to send dark mode status from darkmode.js");
            return;
        }
    }).catch((err) => {
        console.error("Error in darkmode.js sendDarkmodeStatus():", err);
    })
}


function Darkmode_class_add_remove(dark) {
    const button = document.querySelector('.navbar button');
    if (dark) {
        document.body.classList.add('dark-mode');
        button.textContent = '☀️ Light Mode';
        localStorage.setItem('darkmode', !dark);
    } else {
        document.body.classList.remove('dark-mode');
        button.textContent = '🌙 Dark Mode';
        localStorage.setItem('darkmode', !dark);
    }
}