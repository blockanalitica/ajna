import Navbar from './Navbar'
import Footer from './Footer'
import Background from './Background'

const navigation_app = [
    { name: 'Pools', href: '/pools', current: false },
    { name: 'Grants', href: '#', current: false },
    { name: 'Docs', href: '#', current: false },
    { name: 'FAQ', href: '#', current: false },
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