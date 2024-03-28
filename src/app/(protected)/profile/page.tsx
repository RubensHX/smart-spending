import { auth } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CardContent, Card } from '@/components/ui/card'
import { getUserById } from '@/data/user'

export default async function ProfilePage() {
  const session = await auth()
  const userFirstLetter = session?.user?.name?.charAt(0) ?? ''
  const email = session?.user?.email ?? ''
  const name = session?.user?.name ?? ''
  const user = await getUserById(session?.user?.id ?? '')
  const role = user?.role.at(0) ?? ''
  const birthDate = user?.birthDate?.toLocaleDateString() ?? ''

  return (
    <Card className="w-full max-w-7xl">
      <CardContent className="space-y-6 py-3 px-3">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={session?.user?.image ?? ''}
              alt="User profile image"
            />
            <AvatarFallback>{userFirstLetter}</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-2 text-center">
            <div className="font-bold text-2xl">{name}</div>
            <Badge variant="outline">{role}</Badge>
          </div>
        </div>
        <div className="grid gap-1.5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Autistic af
          </p>
        </div>
        <div className="grid gap-1.5">
          <dl className="grid grid-cols-2 gap-1.5 text-sm">
            <div className="font-medium">Email</div>
            <div className="text-right">{email}</div>
            <div className="col-span-2" />
            <div className="font-medium">Date of Birth</div>
            <div className="text-right">{birthDate}</div>
          </dl>
        </div>
      </CardContent>
    </Card>
  )
}
