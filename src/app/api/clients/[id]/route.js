import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  
  try {
    const client = await prisma.users.findUnique({
      where: { id: id, role: 'CLIENT' },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        company: true,
        companyEmail: true,
        companyPhone: true,
        companyRUT: true,
        driveURL: true
      }
    });

    if (!client) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching client', error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const id = parseInt(params.id);

  try {
    const { driveURL } = await request.json();

    const updatedClient = await prisma.users.update({
      where: { id: id, role: 'CLIENT' },
      data: { driveURL },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        company: true,
        companyEmail: true,
        companyPhone: true,
        companyRUT: true,
        driveURL: true
      }
    });

    if (!updatedClient) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating client', error: error.message }, { status: 500 });
  }
}