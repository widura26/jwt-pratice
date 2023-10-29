import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const signup = async (req, res) => {
    try {        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const savedUser = await user.save();
        res.status(200).send({ 
            message: "User Registered successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }

}

export const signin = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if(!user){
            return res.status(404).send({
                message: "User not found."
            })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }, 
            message: "Login successfull",
            accessToken: token
        })


    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}