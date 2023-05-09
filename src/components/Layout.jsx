import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const navigation_app = [
    { name: 'Pools', href: '/pools', current: false },
    { name: 'Tokens', href: '/tokens', current: false },
    { name: 'Auctions', href: '#', current: false },
    { name: 'Grants', href: '#', current: false },
  ]

export default function Layout({ children }) {
  return (
    <div>
      <Navbar navigation={navigation_app}/>
      <div className="py-10">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}