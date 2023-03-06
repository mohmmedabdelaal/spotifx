import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest,res:NextApiResponse) =>{
    const prisma = new PrismaClient();
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where: {email,}
    })

    if (user && bcrypt.compareSync(password,user.password)){
        const token = jwt.sign({
            email: user.email,
            id: user.id,
            time: Date.now()
        }, 'ok' , {expiresIn: '10h'})

        res.setHeader('Set-Cookie',
            cookie.serialize('SpotifyMirror', token, {
                httpOnly: true,
                maxAge: 8 * 60 * 12,
                path: '/',

            }),)
        res.json(user)
    }else {
        res.status(401);
        res.json({error: "Invalid Email or password"});
        return
    }
}

