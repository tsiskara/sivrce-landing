import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Toaster } from './components/ui/sonner'
import Home from './pages/Home'

const Search = lazy(() => import('./pages/Search'))
const ListingDetail = lazy(() => import('./pages/ListingDetail'))

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-sv-cloud" role="status" aria-label="იტვირთება">
      <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-sv-blue/20 border-t-sv-blue" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={
            <Suspense fallback={<PageFallback />}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <ListingDetail />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <ListingDetail />
            </Suspense>
          }
        />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  )
}
