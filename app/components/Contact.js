'use client'
import { toast } from "react-toastify";

export default function Contact() {
    const alert = () => {
        console.log('clicked');
        toast.warning('Hello World!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
            <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2">CONTACT ME</h3>
            
            <div className="p-4 bg-blue-500" onClick={alert}>
                Click
            </div>
        </>
    )
}