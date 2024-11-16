document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        } else {
            alert('Registration successful!');
            // Redirect or perform other actions on successful registration
        }
    } catch (error) {
        alert('Network error. Please try again.');
    }
});