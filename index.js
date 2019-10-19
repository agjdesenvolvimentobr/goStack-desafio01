const express = require("express");
const server = express();

server.use(express.json());

const projects = [];
var countRequests = 0;
server.use((req, res, next)=>{
  console.log(`Request number: ${++countRequests} Metodo:${req.method} URL:${req.url}`);
  return next()
})
function verifyIDproject(req, res, next){
  const {id} = req.params
  for (let i = 0; i < projects.length; i++) {
    if(projects[i].id == id){
      req.indexProject = i
      return next()
    }
  }
  return res.status(400).json({error: "Project not found!"})
  
}

//Home
server.get("/", (req, res)=>{
  res.send("OK")
})
//Create
server.post("/projects", (req, res)=>{
  const {id, title, tasks} = req.body;
  projects.push({ id, title, tasks});
  return res.json(projects);
})
//Add tasks
server.post("/projects/:id/tasks", verifyIDproject,(req, res)=>{
  const {indexProject} = req
  const {title} = req.body
  projects[indexProject].tasks.push(title)
  return res.json(projects[indexProject])
})
//Read
server.get("/projects", (req, res)=>{
  return res.json(projects)
})
//Update
server.put("/projects/:id",verifyIDproject, (req, res)=>{
  const {indexProject} = req;
  const {title} = req.body;
  projects[indexProject].title = title;
  return res.json(projects)  
})
//Delete
server.delete("/projects/:id",verifyIDproject, (req, res)=>{
  const {indexProject} = req;
  projects.splice(indexProject, 1);
  return res.send();  
})

server.listen(3000);