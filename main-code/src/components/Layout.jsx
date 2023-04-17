import Background from './Background'
import Footer from './Footer'
import Navbar from './Navbar'

const navigation_app = [
    { name: 'Pools', href: '/pools', current: false },
    { name: 'Tokens', href: '#', current: false },
    { name: 'Auctions', href: '#', current: false },
    { name: 'Grants', href: '#', current: false },
  ]

export default function Layout({ children }) {
  return (
    <Background>
      <Navbar navigation={navigation_app}/>
      <div className="py-10">
        <main>{children}</main>
      </div>
      <Footer />
    </Background>
  )
}