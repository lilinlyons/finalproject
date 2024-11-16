document.getElementById('subscribe').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { name, email } = data;

    try {
        console.log("Inserting email...");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error(`Invalid email address format: ${email}`);
        }

        const response = await fetch('/emailalerts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });
        console.log(response)

        if (!response.ok) {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        } else {
            alert('Email registration successful!');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
