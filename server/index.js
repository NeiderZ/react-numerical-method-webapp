const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())

const port = 8000

let users = []
let counter = 1

app.get('/user', (req, res) => {
    console.log("test")
    res.json(users)
})

app.post('/user', (req, res) => {
    let user = req.body
    user.id = counter
    counter++

    users.push(user)

    res.json({
        message: "add ok",
        user: user
    })
})

app.patch('/user/:id', (req, res) => {
    let id = req.params.id
    let updateUser = req.body

    let selectedIndex = users.findIndex(user => user.id == id)

    if(updateUser.firstname){
        users[selectedIndex].firstname = updateUser.firstname ||  users[selectedIndex].firstname
    }

    if(updateUser.lastname){
        users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
    }

    res.send({
        message: "update user complete!",
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    })
})

app.delete('/user/:id', (req, res) => {
    let id = req.params.id

    let selectedIndex = users.findIndex(user => user.id == id)

    users.splice(selectedIndex, 1)

    res.json({
        message: "delete complete!",
        indexDeleted: selectedIndex
    })
})

app.listen(port, (req, res) => {
    console.log('http server run at ' + port)
})