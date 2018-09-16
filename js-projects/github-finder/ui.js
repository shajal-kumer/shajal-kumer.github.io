
class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-3">
                <img src="${user.avatar_url}" class="img-fluid mb-2" alt="">
                <a href="${user.html_url}" class="btn btn-primary mb-4 btn-block">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
            

            <br><br>
            <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
            </div>
        </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>`;
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
    // Show alert
    showAlert(message, className) {
        this.clearAlert();
        // Create Element 
        let div = document.createElement('div');
        // Add Class name
        div.className = className;
        // Add Text Node or message
        div.appendChild(document.createTextNode(message));
        // Select container 
        const container = document.querySelector('.searchContainer');
        // Get parent
        const search = document.querySelector('.search');
        // Insert Elemetn
        container.insertBefore(div, search);

        setTimeout(() => {
            // div.remove();  Or 
            this.clearAlert();
        }, 3000)

    }
    // Clear Current alert
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert)
            currentAlert.remove();
    }

    // Show Repos
    showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                            <a href="${repo.html_url}">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-secondary">Watchers: ${repo.watcher_count}</span>
                        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>

            `;

            document.getElementById('repos').innerHTML = output;
        });
    }
}