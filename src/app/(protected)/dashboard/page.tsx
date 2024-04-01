import { auth } from '@/auth'
import TransactionsList from '@/components/transaction/transactions-list'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getBudgetByUserId } from '@/data/budget'
import {
  getExpenseTransactionsByUserId,
  getIncomeTransactionsByUserId,
} from '@/data/transaction'
import { getUserById } from '@/data/user'
import { CalendarClock, WalletIcon } from 'lucide-react'
import Image from 'next/image'

export default async function DashboardPage() {
  const session = await auth()
  const user = await getUserById(session?.user?.id ?? '')
  const budget = await getBudgetByUserId(user?.id ?? '')
  const expenseTransactions = await getExpenseTransactionsByUserId(
    user?.id ?? '',
  )
  const incomeTransactions = await getIncomeTransactionsByUserId(user?.id ?? '')

  const moneyWasted =
    expenseTransactions?.map((s) => s.amount).reduce((a, b) => a - b, 0) ?? 0
  const moneyEarned =
    incomeTransactions?.map((i) => i.amount).reduce((a, b) => a + b, 0) ?? 0
  const currentBudget = moneyEarned + moneyWasted

  return (
    <div className="grid gap-4 w-full px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Financial Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button className="hidden sm:flex" variant="outline">
            Today
          </Button>
          <Button className="hidden md:flex" variant="outline">
            This Month
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-[200px] justify-start text-left font-normal"
                id="date"
                variant="outline"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                {new Date().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar initialFocus mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Money Wasted</CardDescription>
            <CardTitle>
              {moneyWasted.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image
              alt="Chart"
              className="rounded-lg object-cover"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: '250/150',
                objectFit: 'cover',
              }}
              width="250"
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Current Budget</CardDescription>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <WalletIcon className="mr-2 h-4 w-4" />
                {currentBudget.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Money Earned</CardDescription>
            <CardTitle>
              {moneyEarned.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image
              alt="Chart"
              className="rounded-lg object-cover"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: '250/150',
                objectFit: 'cover',
              }}
              width="250"
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your most recent account activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <TransactionsList userId={user?.id ?? ''} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
