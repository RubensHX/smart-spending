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
    <div className="grid gap-4 w-full p-2">
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
                <CalendarClockIcon className="mr-2 h-4 w-4" />
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
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
          <CardDescription>Spending trends over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Image
            alt="Chart"
            className="rounded-lg object-cover"
            height="250"
            src="/placeholder.svg"
            style={{
              aspectRatio: '500/250',
              objectFit: 'cover',
            }}
            width="500"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CalendarClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.25V14" />
      <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
    </svg>
  )
}
