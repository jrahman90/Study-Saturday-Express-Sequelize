const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
    try {
      const tests = await Test.findAll()
      res.send(tests)
    } catch (error) {
      next(error)
    }
  })
  router.get('/:id', async (req, res, next) => {
    try {
      let test = await Test.findByPk(req.params.id)
      if (test) {
        res.send(test)
      } else {
        res.status(404).send('Test not found')
      }
    } catch (error) {
      next(error)
    }
  })
  //adding a new test instance for a specific student
  router.post('/student/:studentId', async (req, res, next) => {
    try {
      let student = await Student.findByPk(req.params.studentId)
      let test = await Test.create(req.body)//details the user is putting into the site
        let studentTest = await test.setStudent(student)//majic method .setStudent created by sequelize when you set a relation(tests.belongsTo(student))
        res.status(201).send(studentTest)
    } catch (error) {
      next(error)
    }
  })
  //delete a test from a student
  router.delete('/:id', async (req, res, next) => {
    try {
        /*//one way (but it requests form the db 2 times)
        const toBeDeleted = await Test.findByPk(req.params.id)
        await Test.destroy(toBeDeleted)
        */
      await Test.destroy({ where: {id: req.params.id}})
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  })
module.exports = router;
