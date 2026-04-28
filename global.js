console.log("IT'S ALIVE!");

function $$(selector, context=document) {
    return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$('nav a')
// let currentLink = navLinks.find(
//     (a) = a.host === location.host && a.pathname === location.pathname,
// );

// currentLink.classList.add('current');
// if (currentLink) {
//     // or if (currentLink !== undefined)
//     currentLink?.classList.add('current');
// }

let pages = [
    {url: '', title: 'Home'},
    {url: 'contact/', title: 'Contact'},
    {url: 'projects/', title: 'Projects'},
    {url: 'https://github.com/Kyle-dang678', title: 'Profile'},
    {url: 'resume.html', title: 'Resume'}
]

const BASE_PATH = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? "/"
    : "/portfolio-lab1-beta-test-/";

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    url = !url.startsWith('http') ? BASE_PATH + url : url;
    
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current')
    }

    if (a.host !== location.host) {
        a.target = '_blank'
    }

    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `<label class="color-scheme">
        Theme: 
        <select>
            <option value='light dark'>Automatic</option>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
        </select>
    </label>`
)

let select = document.querySelector('.color-scheme select')
function setColorScheme(scheme){
    document.documentElement.style.setProperty('color-scheme', scheme);
    select.value = scheme;
}
if ('colorScheme' in localStorage) {
    setColorScheme(localStorage.colorScheme);
} else {
    setColorScheme('light dark');
}
select.addEventListener('input', function(event) {
    localStorage.colorScheme = event.target.value;
    setColorScheme(event.target.value);
});

let form = document.querySelector('form');
form?.addEventListener('submit', function(event){
    event.preventDefault();
    let data = new FormData(form);
    let url = form.action + '?';
    for (let[name, value] of data) {
        url += `${name}=${encodeURIComponent(value)}&`;
    }
    location.href = url;
});

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel='h2') {
    containerElement.innerHTML = '';
    for (let project of projects) {
        const article = document.createElement('article');
        article.innerHTML = `
            <${headingLevel}>${project.title}</${headingLevel}>
            <img src ="${project.image}" alt = "${project.title}">
            <p>${project.description}</p>
            <div>
                <p>${project.year}</p>
            </div>
        `;
        containerElement.appendChild(article);
    }
}

export async function fetchGithubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}