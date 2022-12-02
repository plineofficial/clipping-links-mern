const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            res.status(401).json({message: 'Нет авторизации'})
        }
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded
            console.log('-------------------------')
            console.log(decoded)
            console.log('-------------------------')
            next()  
        } catch (error) {
            console.log(error)
        }
        
        
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}