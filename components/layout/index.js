import Header from './header'
import SideBar from './sidebar'

export default function Layout({ children }) {
  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <SideBar />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <Header />
            <div className="overflow-auto h-screen pb-28 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
