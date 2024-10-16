const express = require("express");
const app = express()
const bodyParser = require("body-parser");

const port = 3000;
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})

app.use(bodyParser.json())
let users =[]
let counter = 1

// POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', (req, res) => {
    let user = req.body
    user.id = counter
    counter += 1

    users.push(user)
    res.json({
        message: 'Add user is OK',
        user: user
    })
    
})
// GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', (req, res) => {
    const filterUser = users.map(user => {
        return {
            fristname: user.fristname,
            lastname: user.lastname,
            fullname: user.fristname + ' ' + user.lastname,
            id: user.id
        }
    })
    res.json(filterUser)
})
// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
    let id = req.params.id
    let seclectedIndex = users.findIndex(user => user.id == id)

    res.json({
        message: 'get changID OK',
        selecter: users[seclectedIndex]
    })
})
// PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', (req, res) => {
    let id = req.params.id
    let userUpdate = req.body

    //ค้นคน user
    let seclectedIndex = users.findIndex(user => user.id == id)
    //update
    users[seclectedIndex].fristname = userUpdate.fristname || users[seclectedIndex].fristname 
    users[seclectedIndex].lastname = userUpdate.lastname || users[seclectedIndex].lastname
    //show data update 
    res.json({
        message: 'Update OK',
        data: {
            fristname: userUpdate.fristname,
            lastname: userUpdate.lastname
        }
    })
})
// DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', (req, res) => {
    let id = req.params.id
    // chang user id
    let seclectedIndex = users.findIndex(user => user.id == id)
    // delete user
    //delete users[seclectedIndex]
    users.splice(seclectedIndex, 1)
    //respon client
    res.json({
        message: 'Delete is OK',
        deleteIndex: seclectedIndex
    })
})