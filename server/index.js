const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const port = 8000;

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tutorials',
    port: 8889
  })
}

//GET /users MySQL
app.get('/users', async (req, res) => { 
  try {
    let results = await conn.query('SELECT * FROM users')
    res.json(results[0])
  } 
  catch (error) {
    console.log('Error fetching user :', error.message)
    res.status(500).json({error: 'Error fetching user'})
  }

})

// POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
  const user = req.body
  try{
    const result = await conn.query('INSERT INTO users SET ?', user)
    res.json({
      message: 'INSERT is OK',
      userId: result[0]
    })
  } 
  catch(error)
  {
    res.status(500).json({
      message: 'someting wrong', 
      error: error
    })
  }
})

//GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  try 
  {
    const result = await conn.query('SELECT * FROM users WHERE userID = ?', id)
    if (result[0].length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(result[0][0])
  } 
  catch (error) {
    console.log('Error GET user',error.message)
    res.status(500).json({message: 'Error GET user'})
  }
})

//PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body

  try {
    const result = await conn.query('UPDATE users SET ? WHERE userID = ?', [data, id])
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ message: 'User updated successfully', userId: id })
  } catch (error) {
    console.error('Error updating user:', error.message)
    res.status(500).json({ error: 'Error updating user' })
  }
})

//DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
  const id  = req.params.id
  try {
      const result = await conn.query('DELETE FROM users WHERE userID = ?', id)
      res.status(200).json({
        message: 'DELETE OK',
        data: result
      })
  }
  catch (error) {
    console.error('Error updating user:', error.message)
    res.status(500).json({ error: 'Error updating user' })
  }
})

app.listen(port, async () => {
  await initMySQL()
  console.log(`Server is runing on port ${port}`)
})