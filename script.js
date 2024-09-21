document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('inputName').value;
    const phone = document.getElementById('inputPhone').value;
    const email = document.getElementById('inputEmail').value;
    
    let isValid = true;

    // Basic validation
    if (!name) {
        document.getElementById('nameError').innerText = 'Name is required';
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = '';
    }

    if (!phone) {
        document.getElementById('phoneError').innerText = 'Phone is required';
        isValid = false;
    } else {
        document.getElementById('phoneError').innerText = '';
    }

    if (!email) {
        document.getElementById('emailError').innerText = 'Email is required';
        isValid = false;
    } else {
        document.getElementById('emailError').innerText = '';
    }

    if (isValid) {
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
