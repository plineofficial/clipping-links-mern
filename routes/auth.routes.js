const { Router } = require("express");
const {check, validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()

router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимум 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            console.log(req.body)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }
            const {email, password} = req.body
            
            const candidate = await User.findOne({email})
            if (candidate){
                res.status(400).json({message: 'Пользователь уже существует!'})
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: 'Пользователь создан'})
        } catch (error) {
            res.status(500).json({message: 'Error, try again'})
        }
    }
)

router.post('/login', 
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message: 'Неверные данные'})
            }
            const token = jwt.sign(
                {userId : user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, 'We': 'we'})

        } catch (error) {
            res.status(500).json({message: 'Error, try again'})
        }
    }
)

module.exports = router