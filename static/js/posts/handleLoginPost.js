async function handleFormSubmit() {
    event.preventDefault()

    const form = document.querySelector('#weddingPlannerForm');
    const loadingScreen = document.querySelector('#loading-screen');
    let postData = document.getElementById("planner-page--body-content")
    const formData = {};

    for (const element of form.elements) {
        if (element.type === 'text' && element.value.trim() !== '') {
            formData[element.name] = element.value;
        }
    }

    if (Object.keys(formData).length === 0) {
        console.log('No data to send.');
        return;
    }

    form.style.display = 'none'
    loadingScreen.style.display = 'block';

    fetch('/post/plan', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:")
        console.log(data);
        loadingScreen.style.display = 'none';
        postData.innerHTML = data.htmlResults
        postData.style.padding = "15px"
        })
    .catch(error => {
        console.error('Error:', error);
        loadingScreen.style.display = 'none';
    });
}