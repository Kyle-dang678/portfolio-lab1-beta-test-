import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `Projects (${projects.length})`;
renderProjects(projects, projectsContainer, 'h2');

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let colors = d3.scaleOrdinal(d3.schemeTableau10);
let query = '';
let selectedIndex = -1;

function renderPieChart(projectsGiven) {
    let rolledData = d3.rollups(
        projectsGiven, 
        (v) => v.length,
        (d) => d.year,
    );
    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year};
    });

    d3.select('#projects-pie-plot').selectAll('path').remove()
    d3.select('.legend').selectAll('li').remove()

    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);
    let arcs = arcData.map((d) => arcGenerator(d));
    arcs.forEach((arc, idx) => {
        d3.select('#projects-pie-plot')
            .append('path')
            .attr('d', arc)
            .attr('fill', colors(idx))
            .on('click', () => {
                selectedIndex = selectedIndex === idx ? -1 : idx;
                d3.select('#projects-pie-plot')
                    .selectAll('path')
                    .attr('class', (_, i) => i === selectedIndex ? 'selected' : '');
                d3.select('.legend')
                    .selectAll('li')
                    .attr('class', (_, i) => i === selectedIndex ? 'legend-item selected' : 'legend-item');
                
                if (selectedIndex === -1) {
                    renderProjects(projects, projectsContainer, 'h2');
                } else {
                    let selectedYear = data[selectedIndex].label;
                    let filteredProjects = projects.filter((p) => p.year === selectedYear);
                    renderProjects(filteredProjects, projectsContainer, 'h2');
                }
            });
    });

    let legend = d3.select('.legend');
    data.forEach((d, idx) => {
        legend
            .append('li')
            .attr('style', `--color:${colors(idx)}`)
            .attr('class', 'legend-item')
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
}

renderPieChart(projects);
renderProjects(projects, projectsContainer, 'h2');

let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    query = event.target.value;
    let filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join('\n').toLocaleLowerCase();
        return values.includes(query.toLocaleLowerCase());
    });
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects);
});

function getFilteredProjects() {
    return projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        let matchesQuery = value.includes(query.toLowerCase());
        let matchesYear = selectedIndex === 1 || project.year === data[selectedIndex]?.label;
        return matchesQuery && matchesYear;
    })
}
