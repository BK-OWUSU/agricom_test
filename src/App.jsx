import { BrowserRouter as Router} from "react-router-dom";
import { Flowbite} from "flowbite-react"
import AppRoutes from "@/routes/AppRoutes";
import { AuthUserContextProvider } from "@/contextManager/contextProvider/AuthUserContextProvider";
function App() {
 
  return (
    <Router>
       <Flowbite>
        <AuthUserContextProvider>
          <AppRoutes/>
        </AuthUserContextProvider>
      </Flowbite>
    </Router>
  )
}

export default App