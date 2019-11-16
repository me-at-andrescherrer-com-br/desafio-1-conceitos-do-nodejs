const express = require('express');
const server = express();

server.use(express.json());

const projects = [
  {
    id: "1", 
    title: "Novo projeto 1", 
    tasks: ["Nova tarefa 1.1"]
  },
  {
    id: "2", 
    title: "Novo projeto 2", 
    tasks: ["Nova tarefa 2.1"]
  }
];

let cont_req = 0;

// MIDDLEWARES
function checkProjectExists(req, res, next) {
  const project = projects.find( p => p.id === req.params.id );

  if(!project){
    return res.status(400).json({ error: 'Project does not exists!'});
  }
  req.project = project;

  return next();
}

server.use((req, res, next) => {
  cont_req++;
  console.log(`Request #${cont_req}`);
  next();
});

// Show all projects
server.get('/projects', (req, res) => {
  
  return res.json(projects);
});

// Show a project
server.get('/projects/:id', checkProjectExists, (req, res) => {
  return res.json(req.project);
});

// Add a project
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  
  project = {
    id: id,
    title: title,
    tasks: []
  }
    
  projects.push(project);

  return res.json(projects);
});

// Update a project
server.put('/projects/:id', checkProjectExists, (req, res) => {  
  const { title } = req.body;  
  req.project.title = title;

  return res.json(projects);
});

// Delete a project
server.delete('/projects/:id', checkProjectExists, (req, res) => {  
  
  let index = projects.indexOf(req.project);
  projects.splice(index, 1);

  return res.json();
});

// Add a task
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;  
  
  req.project.tasks.push(title);

  return res.json(projects);
});


server.listen(24816);