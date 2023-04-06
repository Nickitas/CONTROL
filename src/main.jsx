import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { CatLoading } from './components/UI/loadings/CatLoading/CatLoading'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import App from './App'
import './index.scss'

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Suspense fallback={<CatLoading/>}>
            <AuthProvider>
                <Routes>
                    <Route path={'/*'} element={<App />} />
                </Routes>
            </AuthProvider>
        </Suspense>
    </BrowserRouter>
)