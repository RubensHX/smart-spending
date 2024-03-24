import { Button } from '@/components/ui/button'
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import Image from 'next/image'
import { auth } from '@/auth'
import { getUserById } from '@/data/user'
import { getBudgetByUserId } from '@/data/budget'
import { getSpendingByUserId } from '@/data/spending'
import { CalendarClock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()
  const user = await getUserById(session?.user?.id ?? '')
  const budget = await getBudgetByUserId(user?.id ?? '')
  const spending = await getSpendingByUserId(user?.id ?? '')
  const currentBudget =
    budget?.map((b) => b.amount).reduce((a, b) => a + b, 0) ?? 0
  const moneyWasted =
    spending?.map((s) => s.amount).reduce((a, b) => a + b, 0) ?? 0

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
              {currentBudget.toLocaleString('en-US', {
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
      </div>
    </div>
  )
}
