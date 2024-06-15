document.addEventListener("DOMContentLoaded", function () {
    // Load security team members on the teamwork page
    const securityTeamContainer = document.getElementById('security-team');
    if (securityTeamContainer) {
        fetch('http://localhost:3000/Security-Team')
            .then(response => response.json())
            .then(data => {
                data.forEach(member => {
                    const memberCard = document.createElement('div');
                    memberCard.classList.add('card', 'col-md-4', 'mb-4');
                    memberCard.style.width = '18rem';
                    memberCard.innerHTML = `
                        <img src="${member.image_url}" class="card-img-top" alt="${member.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${member.name}</h5>
                            <p class="card-text">${member.description}</p>
                            <p class="card-text">Phone: ${member.phone}</p>
                            <button class="btn btn-danger delete-btn" data-id="${member.id}">Delete</button>
                        </div>
                    `;
                    securityTeamContainer.appendChild(memberCard);
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const memberId = this.getAttribute('data-id');
                        fetch(`http://localhost:3000/Security-Team/${memberId}`, {
                            method: 'DELETE'
                        })
                            .then(() => {
                                this.closest('.card').remove();
                            })
                            .catch(error => console.error('Error deleting member:', error));
                    });
                });
            })
            .catch(error => console.error('Error loading security team data:', error));
    }

    // Handle feedback form submission on the security page
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const image_url = document.getElementById('image_url').value;

            const feedback = {
                name: name,
                description: description,
                phone: phone,
                message: message,
                image_url: image_url
            };

            fetch('http://localhost:3000/Security-Team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('feedback-result').innerHTML = `
                        <div class="alert alert-success" role="alert">
                            Feedback submitted successfully!
                        </div>
                    `;
                    feedbackForm.reset();
                })
                .catch(error => {
                    document.getElementById('feedback-result').innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Error submitting feedback. Please try again.
                        </div>
                    `;
                });
        });
    }
});
