import { db } from '@/lib/db'

export async function GET(req: Request): Promise<Response> {
  const params = new URL(req.url).searchParams
  const userId = params.get('userId')

  if (!userId) {
    return Response.json({ message: 'userId is required' }, { status: 400 })
  }

  const transactions = await db.transaction.findMany({
    where: { userId },
  })

  if (!transactions) {
    return Response.json({ message: 'No transactions found' }, { status: 204 })
  }

  return Response.json(transactions, { status: 200 })
}

export async function POST(req: Request): Promise<Response> {
  const { amount, description, type, category, userId } = await req.json()

  if (!userId) {
    return Response.json({ message: 'userId is required' }, { status: 400 })
  }

  const transaction = await db.transaction.create({
    data: {
      amount,
      description,
      type,
      category,
      user: { connect: { id: userId } },
    },
  })
  return Response.json(transaction, { status: 201 })
}
