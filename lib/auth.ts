import jwt from 'jsonwebtoken';
import prisma from './prisma';
import {NextApiRequest, NextApiResponse} from "next";

export const validateUser = (handler) =>{
    return async (req:NextApiRequest,res:NextApiResponse) =>{
        const token = req.cookies.SpotifyMirror;

        if(token) {
            let user;
            try {
            const {id} = await jwt.verify(token,'ok');
            user = await prisma.user.findUnique({
                where: {id}
            });
            if(!user) {
                throw new Error('Can not find user')
            }
            }catch (e) {
                console.error(e)
                res.status(401);
                res.json({error: 'User not found'})
                return
            }

            return handler(req,res,user);
        }
        res.status(401)
        res.json({error: 'User not found'});
    }
}