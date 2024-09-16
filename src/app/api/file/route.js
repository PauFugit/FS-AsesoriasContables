import {NextResponse} from 'next/server'
import prisma from '@/lib/prisma'


export async function GET(){
    try {
        const file = await prisma.file.findMany();
        return NextResponse.json({data:file}, {status:200});
    }catch (error) {
        return new NextResponse(error.message, {status:5000})
    }
}

export async function POST(request){
    try{
        const data = await request.json()
        const file = await prisma.file.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(file), {
            headers: {"Content-Type":"application/json"},
            status: 201
        })
    }catch (error){
        return new NextResponse(error.message, {status:500})
    }
 
}