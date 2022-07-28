import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { ErrorTypes, TypedJwtToken } from '../types/app';
import { UserRole } from '../types/model';

export function authenticate(req: Request, res:Response, next:NextFunction){
    try{
        const token = req.cookies?.token;
        if(!token){
            throw new Error(ErrorTypes.UNAUTHORISED)
        }
        const decodedToken= jwt.verify(token, process.env.SECRET_KEY!)
        const {id, role} = (decodedToken as TypedJwtToken);
        req.body.userId = id;
        req.body.userRole = role;
        
        next()
    }
    catch(err:any){
        res.status(401).send({success:false, message:err.message})
    }
}

export async function authorizeAdmin(req: Request, res:Response, next:NextFunction){
    const {userRole} = req.body;
    try{
        if(userRole===UserRole.ADMIN){
            next()
        }
        else{
            throw new Error(ErrorTypes.UNAUTHORISED)
        }
    }
    catch(err:any){
        res.status(401).send({success:false, message:err.message})
    }
}