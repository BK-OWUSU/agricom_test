import { Spinner } from "flowbite-react"; 

export function TransparentLoader() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* <Spinner size="xl" color="success" /> */}
            <Spinner color="success" className="text-green-800" size="xl" aria-label="Loading..." />
        </div>
    </div>
  )
}

