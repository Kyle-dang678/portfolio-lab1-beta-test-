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
    {url: 'profile/', title: 'Profile'},
    {url: 'resume/', title: 'Resume'}
]

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    nav.insertAdjacentHTML('beforeend', '<a href="${url}">${title}</a>');
}