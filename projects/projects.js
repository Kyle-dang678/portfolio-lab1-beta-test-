import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `Projects (${projects.length})`;
renderProjects(projects, projectsContainer, 'h2');

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let colors = d3.scaleOrdinal(d3.schemeTableau10);

let data = [1, 2];
let sliceGenerator = d3.pie()
let arcData = sliceGenerator(data);
let arcs = arcData.map((d) => arcGenerator(d));
arcs.forEach((arc) => {
    d3.select('svg')
        .append('path')
        .attr('d', arc)
        .attr('fill', colors(idx));
});