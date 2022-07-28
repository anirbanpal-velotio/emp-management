import express,{Request,Response,NextFunction, response} from 'express';
import { authenticate, authorizeAdmin } from '../../middleware';
import User from '../../services/user';
import { ErrorTypes, IDeleteUserParams, IUpdateUserParams } from '../../types/app';
import { IUserAttributes } from '../../types/model';

const router = express.Router();
const userService = new User()
router.get('/',authenticate, async(req:Request, res:Response)=>{
    try{
        const users = await userService.getAllUsers();
        res.status(200).send({success:true, users});
    }
    catch(err:any){
        if(err.message===ErrorTypes.INTERNAL_SERVER_ERROR){
            res.status(500).send({success:false, message: err.message})
        }
        else{
            res.status(400).send({success:false, message: err.message})
        }
    }
})

router.get('/:id',authenticate, async(req:Request, res:Response)=>{
    try{
        const id = +req.params.id;
        if(Number.isNaN(id)){
            throw new Error(ErrorTypes.INVALID_USER_ID)
        }
        const user = await userService.getUserById(id)
        res.status(200).send({success:true, user})
    }
    catch(err:any){
        if(err.message===ErrorTypes.INTERNAL_SERVER_ERROR){
            res.status(500).send({success:false, message: err.message})
        }
        else{
            res.status(400).send({success:false, message: err.message})
        }
    }
})

router.post('/',authenticate,authorizeAdmin, async(req:Request, res:Response)=>{
    try{
        const {name,email,password,role,age,dateOfJoining} = req.body;
        if(!(name && email && password && role && age && dateOfJoining)){
            throw new Error(ErrorTypes.INVALID_REQUEST_BODY)
        }
        const params:IUserAttributes = {
            name, email, password, role, age, dateOfJoining: new Date(dateOfJoining)
        }
        const user = await userService.createUser(params)
        res.status(201).send({success:true, user})
    }
    catch(err:any){
        if(err.message===ErrorTypes.INTERNAL_SERVER_ERROR){
            res.status(500).send({success:false, message: err.message})
        }
        else{
            res.status(400).send({success:false, message: err.message})
        }
    }
})

router.put('/:id',authenticate, authorizeAdmin, async(req:Request, res:Response)=>{
    try{
        const id = +req.params.id
        if(Number.isNaN(id)){
            throw new Error(ErrorTypes.INVALID_USER_ID)
        }
        const  {name,email,password,role,age,dateOfJoining, userId, userRole} = req.body;
        const params:IUpdateUserParams ={
            requestedUserId:userId,
            requestedUserRole: userRole,id,
            name, email, password, role, age, dateOfJoining
        }
        const user = await userService.editUser(params)

        res.status(200).send({success:true, user})
    }
    catch(err:any){
        if(err.message===ErrorTypes.INTERNAL_SERVER_ERROR){
            res.status(500).send({success:false, message: err.message})
        }
        else{
            res.status(400).send({success:false, message: err.message})
        }
    }
})

router.delete('/:id', authenticate, authorizeAdmin, async(req:Request, res:Response)=>{
    try{
        const id = +req.params.id
        if(Number.isNaN(id)){
            throw new Error(ErrorTypes.INVALID_USER_ID)
        }
        const {userId, userRole} = req.body;
        const params:IDeleteUserParams = {
            requestedUserId:userId,
            requestedUserRole: userRole,
            id
        }
        await userService.deleteUser(params)
        res.status(204).send()
    }
    catch(err:any){
        console.error(err.message)
        if(err.message===ErrorTypes.INTERNAL_SERVER_ERROR){
            res.status(500).send({success:false, message: err.message})
        }
        else{
            res.status(400).send({success:false, message: err.message})
        }
    }
})

export default router;