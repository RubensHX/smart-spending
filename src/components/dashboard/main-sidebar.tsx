'use client'

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarNavMain,
} from '@/components/dashboard/sidebar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowRightLeft, LineChart } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../dark-mode-toggle'
import { UserDropdown } from './user-dropdown'
const font = Poppins({ subsets: ['latin'], weight: ['600'] })

export default function MainSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <Sidebar className="h-screen">
      <SidebarHeader>
        <Link href="/">
          <div className="flex flex-row items-center justify-center space-x-2">
            <Image src="/favicon.png" width={40} height={40} alt="Logo" />
            <h1 className={cn('text-lg font-semibold', font.className)}>
              Smart Spending
            </h1>
          </div>
        </Link>
        <Separator />
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/dashboard" active={isActive('/dashboard')}>
              <LineChart className="h-3 w-3 mr-3" />
              Dashboard
            </SidebarNavLink>
            <SidebarNavLink
              href="/transactions"
              active={isActive('/transactions')}
            >
              <ArrowRightLeft className="h-3 w-3 mr-3" />
              Transactions
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Extra links</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink href="/">About</SidebarNavLink>
            <SidebarNavLink href="/">Help</SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>
        <UserDropdown />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
