import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 400 })
  }

  const transaction = await db.transaction.findUnique({
    where: { id },
  })

  if (!transaction) {
    return Response.json({ message: 'Transaction not found' }, { status: 404 })
  }

  return Response.json(transaction, { status: 200 })
}

export async function PUT(req: NextRequest): Promise<Response> {
  const { id, amount, description, type, category } = await req.json()

  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 400 })
  }

  const transaction = await db.transaction.update({
    where: { id },
    data: {
      amount,
      description,
      type,
      category,
    },
  })

  return Response.json(transaction, { status: 200 })
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const { id } = await req.json()

  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 400 })
  }

  await db.transaction.delete({
    where: { id },
  })

  return Response.json({ message: 'Transaction deleted' }, { status: 200 })
}
