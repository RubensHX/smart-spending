import MainSidebar from '@/components/dashboard/main-sidebar'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-4">
      <MainSidebar />
      <main className="h-full w-full p-4 flex items-center justify-center bg-white dark:bg-black">
        {children}
      </main>
    </div>
  )
}

export default ProtectedLayout
