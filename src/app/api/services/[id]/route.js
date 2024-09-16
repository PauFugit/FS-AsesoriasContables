import {NextResponse} from 'next/server'
import prisma from '@/lib/prisma'


export async function GET(request, {params}){
    const id = parseInt(params.id)
    console.log(id);
    try{
        const service = await prisma.service.findFirst({
            where: { id: id },
        });
        if(!service){
            return new NextResponse(`Servicio con la ID ${id} no ha sido encontrado`, {status:404})
        }
        return NextResponse.json(service)
    }catch (error){
        return new NextResponse(error.message, {status:500});

    }
}

export async function DELETE(request, {params}){
    const id = parseInt(params.id)
    try{
        const result = await prisma.service.delete({
            where:{ id: id },
        })
        return NextResponse.json({message: result}, {status:200 });
    }catch(error){
        return new NextResponse(error.message, { status: 500});
    }
}

export async function PUT(request, {params}) {
    console.log(params);
    const id = parseInt(params.id)
    const data= await request.json()
    try{
        const result = await prisma.service.update({
            where:{id: id},
            data:data
        });
        if(!result){
            return new NextResponse(`Servicio con la ID ${id} no ha sido encontrado`, {status:404});
        }
        return NextResponse.json({message:result}, {status:200});
    }catch(error){
        return new NextResponse(error.message, {status:500})
    }  
}


