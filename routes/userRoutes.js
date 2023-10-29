import express from 'express';
import { signin, signup } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authJWT.js';
const router = express.Router();

router.post("/register", signup, (req, res) => {

});

router.post("/login", signin, (req, res) => {

});

router.get('/hiddencontent', verifyToken, (req, res) => {
    if(!req.user){
        res.status(403).send({
            message: "Invalid JWT token"
        });
    }
    if(req.user.role == 'admin'){
        res.status(200).send({
            message: "Congratulations! but there is no hidden content"
        })
    } else {
        res.status(403).send({
            message: "Unauthorised access"
        })
    }
})

export default router;