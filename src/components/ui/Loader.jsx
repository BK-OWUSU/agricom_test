import { Spinner } from "flowbite-react"; 

export  function Loader() {
  return (
     <div className="flex justify-center items-center min-h-screen bg-black/50 backdrop-blur-sm">
        <Spinner color="success" className="text-green-800" size="xl" aria-label="Loading..." />
        <span className="ml-3 text-white text-lg">Loading, please wait...</span>
    </div>
  )
}
