//middleware to ensure that the manager is logged in before accessing certain routes
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//fetch JWT secret string from .env file
const JWT_SECRET = process.env.JWT_SECRET;

const fetchManager = (req, res, next) => {
    // Get manager from the jwt token and add id to req object
    const token = req.header('authToken');     //get the auth token from header of a req
    //if authToken is not present then produce error
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        //verfiy the jwt auth token
        const data = jwt.verify(token, JWT_SECRET);
        if (data.role !== 'manager') {
            return res.status(401).send({ error: "Access denied: This route is for managers only" });
        }
        req.manager = data.manager;
        next()  // Continue to the next middleware or function if authToken is valid
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})    
    }
}

export default fetchManager;