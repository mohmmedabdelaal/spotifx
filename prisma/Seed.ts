import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {artistsData} from "./SongsData";
const prisma = new PrismaClient();

const run = async () => {
    await  Promise.all( artistsData.map(async (artist) =>{
        await prisma.artist.upsert({
            where: {name: artist.name},
            update: {},
            create: {
                name: artist.name,
                songs: {
                    create: artist.songs.map( (song) =>({
                        name:song.name,
                        duration: song.duration,
                        url: song.url
                    }))
                }
            }
        } )
    }))

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: "user@test.com" },
        update: {},
        create: {
            email: "user@test.com",
            password: bcrypt.hashSync("password", salt),
            firstname: "Mohamed",
            lastname: "Abdelaal",
        },
    });

    const songs = await prisma.song.findMany({});

    await Promise.all(new Array(20).fill(1).map(async (_,i) => {
        return prisma.playlist.create({
           data: {
               name: `Playlist @${i+1}`,
               user: {
                   connect: {id : user.id}
               },
               songs: {
                   connect: songs.map((song) => ({
                       id: song.id
                   }))
               }
            }
        })
    }))

}


run().catch((e) =>{
    console.error(e);
    process.exit(1);
}).finally(async () =>{
    await prisma.$disconnect();
})