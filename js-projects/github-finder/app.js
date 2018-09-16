// Gihub init
const github = new Github(); // OR Github
// console.log(github);
// UI Init
const ui = new UI();

// Search input
const searchuser =  document.getElementById('searchUser');

// Search Input event Listener
searchuser.addEventListener('keyup', (e) => {
    // Get input value
    const userText = e.target.value;
    if(userText !== '') {
        // Make HTTP Call
        github.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found') {
                    // Show alert
                    ui.showAlert('User Not Found!', 'alert alert-danger')
                } else {
                    // Show Profile
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
    } else {
       // Clear Profile
       ui.clearProfile();
    }
});
