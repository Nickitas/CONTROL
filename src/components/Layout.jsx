import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'
import { UpDownBtn } from '../components/UI/UpDownBtn/UpDownBtn'


const Layout = () => {

    const content = (<>
        <Header/>
        <Sidebar/>
        <main className='App'>
            <Outlet/>
            <UpDownBtn/>
        </main>
        <Footer/>
    </>)

    return content
}

export { Layout }