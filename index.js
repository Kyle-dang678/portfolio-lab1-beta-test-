import { fetchJSON, renderProjects, fetchGithubData } from "./global.js";
const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0,3);
const projectsContainer = document.querySelector('.projects');
const githubData = await fetchGithubData('Kyle-dang678');
const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
        <h2>My Github Stats</h2>
        <dl>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
        </dl>
    `;
}
renderProjects(latestProjects, projectsContainer, 'h2');

