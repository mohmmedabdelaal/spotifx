import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookie from 'cookie';
import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest,res: NextApiResponse) =>{
    const prisma = new PrismaClient();
    const salt = bcrypt.genSaltSync();
    const { email, password } = req.body;

    let user;

    try {
        // @ts-ignore
        user = await prisma.user.create({
            data: { email, password: bcrypt.hashSync(password, salt) },
        });
    } catch (error) {
        res.status(401);
        res.json({ error: "User already exist" });
    }

    const token = jwt.sign({
     email: user.email,
     id: user.id,
     time: Date.now()
 }, 'ok', {expiresIn: '10h'})

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('SpotifyMirror', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 12,
            path: '/',

        }),


    )
}