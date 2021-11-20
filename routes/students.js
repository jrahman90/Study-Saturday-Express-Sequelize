const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/',async(req,res,next) => {
    try {
        const student = await Student.findAll()
        res.send(student)
    } catch (err) {
        next(err)
    }
    })
    router.get('/:id',async(req,res,next) => {
        try {
            const student = await Student.findByPk(req.params.id)
            if(!student){//it student doesnt exist
                let err = new Error
                err.status = 404
                throw err
            }
            res.send(student)
        } catch (err) {
            next(err)
        }
        })
    router.post('/',async(req,res,next) => {
        try {
            const student = await Student.create(req.body)
            res.status(201).send(student)
        
        } catch (err) {
            next(err)
        }
        })
    router.put('/:id',async(req,res,next) => {
        try {
            const student = await Student.findOne({
                where: {id: req.params.id} //find by name
            })
            student.update(req.body)
            res.send(student)
        } catch (err) {
            next(err)
        }
    })
    router.delete('/:id',async(req,res,next) => {
        try {
            const student = await Student.findOne({
                where: {id: req.params.id}
            })
            student.destroy()
            res.status(204).send(student)
        } catch (err) {
            next(err)
        }
    })

module.exports = router;
