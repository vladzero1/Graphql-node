const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
    const link = await prisma.link.create({
        data: {
            description: "desc",
            url: "desc.com"
        }
    })
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
}

main().catch(e => {throw e}).finally(async() => {prisma.$disconnect})