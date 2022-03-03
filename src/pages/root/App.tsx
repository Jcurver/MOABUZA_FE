import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import ErrorLog from '../../components/ErrorLog'

import Loading from '../Loading'

const MainPage = lazy(() => import('../MainPage'))
const Login = lazy(() => import('../Login'))
const Register = lazy(() => import('../Register'))
const Detail = lazy(() => import('../Detail'))

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
