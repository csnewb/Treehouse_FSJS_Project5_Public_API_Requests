



function createSearch(){
    const searchContainer = document.getElementById('search-container')

    searchContainer.innerHTML = `
                            <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>
    `
}

function getUsers() {
    return fetch('https://randomuser.me/api/?results=12&nat=us')
        .then(response => response.json())
        .then(data => data.results); // return the results property from the data
}


async function displayUsers() {
    const gallery = document.getElementById('gallery');

    try {
        // because fetch is a promise we have to await for it to resolve
        const userArray = await getUsers();

        userArray.forEach((user, index) => {
            console.log(user);
            // Append the user_id to the user object so we can later quickly reference the card/user clicked
            user.user_id = index;


            const first = user.name.first;
            const last = user.name.last;
            const email = user.email;
            const city = user.location.city;
            const state = user.location.state;
            const profilePicture = user.picture.medium;

            const htmlString = `
                        <div class="card" data-uid="${index}">
                            <div class="card-img-container">
                                <img class="card-img" src="${profilePicture}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${first} ${last}</h3>
                                <p class="card-text">${email}</p>
                                <p class="card-text cap">${city}, ${state}</p>
                            </div>
                        </div>
            `;

            gallery.insertAdjacentHTML('beforeend', htmlString);
        });

        gallery.addEventListener('click', (event) => {
            // Get the card that was clicked
            const card = event.target.closest('.card');
            if (card) {
                // get the user_id from the card
                const userId = card.dataset.uid;
                // Use the user_id to find the the right user
                const user = userArray[userId];
                // Call displayModal and pass the user
                displayModal(user);
            }
        });


    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function displayModal(user) {
    const first = user.name.first;
    const last = user.name.last;
    const email = user.email;
    const location = user.location;
    const phone = user.phone;
    const picture = user.picture;
    const dob = user.dob;
    const city = location.city;
    const state = location.state;
    const street = `${location.street.number} ${location.street.name}`;
    const profilePicture = picture.large;
    const birthday = new Date(dob.date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });


    const htmlString = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${profilePicture}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${first} ${last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}, ${state}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text">${street}, ${location.city}, ${location.state} ${location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday}</p>
                </div>
            </div>
        </div>
    `;


    document.body.insertAdjacentHTML('beforeend', htmlString);

    // Attaching an event listener to close the modal
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
    });
}

createSearch();
displayUsers()