import prisma from "../lib/prisma";
import bcrypt from 'bcrypt'
import {artistsData} from "./SongsData";

const run = async () => {
    await Promise.all(
        artistsData.map(async (artist) => {
            return prisma.artist.upsert({
                where: { name: artist.name },
                update: {},
                create: {
                    name: artist.name,
                    songs: {
                        create: artist.songs.map((song) => ({
                            name: song.name,
                            duration: song.duration,
                            url: song.url,
                        })),
                    },
                },
            });
        })
    );
    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: "user@test.com" },
        update: {},
        create: {
            email: "user@test.com",
            password: bcrypt.hashSync("password", salt),
            firstName: "Mohamed",
            lastName: "Abdelaal",
        },
    });

    const songs = await prisma.song.findMany({});
    await Promise.all(
        new Array(10).fill(1).map(async (_, index) => {
            return prisma.playlist.create({
                data: {
                    name: `Playlist # ${index + 1}`,
                    user: { connect: { id: user.id } },
                    songs: { connect: songs.map((song) => ({ id: song.id })) },
                },
            });
        })
    );
};

run()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });