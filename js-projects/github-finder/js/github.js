
class Github {
    constructor() {
        this.client_id = 'b61ee50c95e01c7c66e9';
        this.client_secret = 'c5c20736833e50c2da93046399308b3923090c87';
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }

    async getUser(user) {
        
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=
        ${this.client_id}&client_secret=${this.client_secret}`);

        const reposResponse= await fetch(`https://api.github.com/users/${user}/repos?per_page=
        ${this.repos_count}&sort=${this.repos_sort}&
        client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {
            profile: profile,
            repos
        }
    }
}