import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { HomeView } from "./views/Home"
import { TestView } from "./views/Test"
import { TestResultView } from "./views/TestResult"
import { NotFoundView } from "./views/NotFound"
import { InitLoadingView } from "./component/shared/loadingView/InitLoadingVew"

const router = createBrowserRouter([
  {
    path : "/",   
    children : [
      {
        index : true,
        element : <HomeView/>
      },
      {
        path : "/test",
        element : <TestView/>
      }, 
      {
        path : "/result/:mbti",
        element : <TestResultView/>,
      },
      {
        path : "*",
        element : <NotFoundView/>
      }
    ]
  }
])

const App = () => {

  

  return (
    <>
      <InitLoadingView/>
      <RouterProvider router={router} />
    </>
    
  )
}

export default App
