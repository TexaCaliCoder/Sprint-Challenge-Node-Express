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

server.get('/project/:id/actions', (req, res)=>{
    const { id } = req.params;
    projectDB.getProjectActions(id)
        .then(actions=>{
            res.json(actions)
        })
        .catch(err=>{
            res.status(500).json({message: "issue with your request"})
        })


})

//actions
server.get('/actions', (req, res)=>{
    actionDB.get()
        .then(actions=>{
            res.json(actions)
        })
        .catch(err=>{
            res.status(500).json({message: "problem with request"})
        })
})

server.get('/actions/:id', (req, res)=>{
    const { id } = req.params;
    actionDB.get(id)
        .then(action=>{
            res.json(action)
        })
        .catch(err=>{
            res.status(500).json({message: "problem with request"})
        })
})

server.post('/actions/add', (req, res)=>{
    const data = req.body;
    actionDB.insert(data)
        .then(newAction=>{
            res.json(newAction)
        })
        .catch(err=>{
            res.status(500).json({message: "problem with request"})
        })
})

server.put('/actions/update/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(id){
    actionDB.update(id, data)
    .then(updated=>{
        res.status(202).json(updated)
    })
    .catch(err=>{
        res.status(500)
            .json({ message: "Unable to update"})
    })
    }else{
        res.status(404).json({message: "id not found"})
    }
})

server.delete('/actions/remove/:id', (req,res)=>{
    const { id } = req.params;
    actionDB.remove(id)
    .then(number=>{
        number?res.json({message: "Action go Bye Bye"}):
            res.status(400)
                .json({message: "it might still be ther you should check"})
    })
    .catch(err=>{
        res.status(500)
            .json({message: "Trouble with removing this action"})
    })
})


server.listen(PORT, ()=>{
    console.log(`Running on port: ${PORT}`)
})