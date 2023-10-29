import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
    try {        
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.API_SECRET);

            const user = await User.findOne({
                _id: decode.id
            })
            if(!user){
                res.status(401).send({
                    message: 'User not found'
                })
            } else {
                req.user = user;
                next();
            } 
        }else {
            req.user = undefined;
            next();
        }
    } catch (error) {
        
    }
}

export { verifyToken };
