import {NextRequest,NextResponse} from 'next/server'

const protectedRoutes = ['/','/playlist','/library'];

export default function middleware(req:NextRequest){
    if(protectedRoutes.find((p) => p === req.nextUrl.pathname)){
        const token = req.cookies.SPOTIFY_MIRROR;
        if(!token){
            return  NextResponse.redirect('/singin');
        }
    }
}