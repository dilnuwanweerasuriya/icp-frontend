import { Routes, Route, Link } from 'react-router-dom'
import { LuClipboardList, LuBoxes, LuUsers, LuMessageCircle } from "react-icons/lu";

export default function AdminPage() {
    return (
        <div className="w-full h-full max-h-full bg-accent flex">
            <div className="w-[300px] bg-accent h-full">
                <div className="w-full h-[100px] text-primary flex items-center">
                    <img src="/logo.svg" className="h-full" alt="Logo" />
                    <h1 className="text-2xl">Admin Panel</h1>
                </div>

                <div className="w-full h-[400px] text-white text-2xl flex flex-col">
                    <Link to="/admin" className="w-full h-[50px] flex items-center gap-[10px]"><LuClipboardList /> Orders</Link>
                    <Link to="/admin/products" className="w-full h-[50px] flex items-center gap-[10px]"><LuBoxes /> Products</Link>
                    <Link to="/admin/users" className="w-full h-[50px] flex items-center gap-[10px]"><LuUsers /> Users</Link>
                    <Link to="/admin/reviews" className="w-full h-[50px] flex items-center gap-[10px]"><LuMessageCircle /> Reviews</Link>
                </div>
            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full border-[10px] bg-primary rounded-2xl overflow-y-scroll border-accent">
                <Routes path="/">
                    <Route path="/" element={<h1>Orders </h1>} />
                    <Route path="/products" element={<h1>Products </h1>} />
                    <Route path="/users" element={<h1>Users </h1>} />
                    <Route path="/reviews" element={<h1>Reviews </h1>} />
                </Routes>
            </div>
        </div>
    )
}