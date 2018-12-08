const express = require('express');
const logger = require('morgan');

const projectDB = require('./data/helpers/projectModel');
const actionDB = require('./data/helpers/actionModel');
const PORT = 4050;

const server=express();
server.use(
    express.json(),
    logger('dev')
);

//projects
server.get('/projects', (req, res)=>{
    projectDB.get()
        .then(projects=>{
            res.json(projects)
        })
        .catch(err=>{
            res.status(500)
                .json({ message: "Trouble pulling this project"})
        })
});

server.get('/projects/:id', (req, res)=>{
    const { id } = req.params;
    projectDB.get(id)
        .then(project=>{
            project?
            res.json(project):
            res.status(404)
                .json({message: "this Project doesnt exisit"})
        })
        .catch(err=>{
            res.status(500)
                .json({message:"Trouble pulling this project"})
        })
})

server.post('/projects/add', (req, res)=>{
    const data = req.body
    projectDB.insert(data)
        .then(newProject =>{
            res.status(201).json(newProject)
        })
        .catch(err=>{
            res.status(500)
                .json({ message: "unable to add this project"})
        })
})

server.put('/projects/update/:id', (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    projectDB.update(id, data)
        .then(updated=>{
            res.status(202).json(updated)
        })
        .catch(err=>{
            res.status(500)
                .json({ message: "Unable to update"})
        })
})

server.delete('/projects/remove/:id', (req, res)=>{
    const { id } = req.params;
    projectDB.remove(id)
        .then(number=>{
            number?res.json({message: "Project Nuked"}):
                res.status(400)
                    .json({message: "it might still be ther you should check"})
        })
        .catch(err=>{
            res.status(500)
                .json({message: "Trouble with removing this project"})
        })

})


server.listen(PORT, ()=>{
    console.log(`Running on port: ${PORT}`)
})