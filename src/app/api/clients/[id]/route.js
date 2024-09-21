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
        company: true
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