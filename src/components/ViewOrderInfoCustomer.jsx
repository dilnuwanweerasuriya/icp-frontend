import { useState } from "react";
import { BsEye, BsX, BsCheckCircle, BsClock, BsTruck, BsXCircle } from "react-icons/bs";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
    const order = props.order;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const status = order.status

    const statusOptions = [
        { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: BsClock },
        { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: BsClock },
        { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: BsTruck },
        { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: BsCheckCircle },
        { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: BsXCircle },
    ];

    const getStatusStyle = (statusValue) => {
        return statusOptions.find(s => s.value === statusValue)?.color || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (statusValue) => {
        const StatusIcon = statusOptions.find(s => s.value === statusValue)?.icon || BsClock;
        return <StatusIcon className="w-4 h-4" />;
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: '1000px',
            maxHeight: '95vh',
            borderRadius: '24px',
            padding: '0',
            border: 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
    };

    return (
        <>
            <div className="flex items-center justify-center gap-3">
                <BsEye
                    className="text-gray-600 hover:text-accent cursor-pointer text-lg transition-all hover:scale-110"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="relative bg-gradient-to-br from-white to-gray-50">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-accent to-accent/80 text-white p-6 rounded-t-3xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold">Order Details</h2>
                                <p className="text-white/80 mt-1">Order #{order.orderId}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all"
                            >
                                <BsX className="w-8 h-8" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 max-h-[calc(95vh-180px)] overflow-y-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Order & Customer Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Order Status Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Order Status</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                                Current Status
                                            </label>
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusStyle(status)}`}>
                                                {getStatusIcon(status)}
                                                <span className="capitalize">{status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-semibold text-gray-800 mt-1">{order.paymentMethod}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="font-semibold text-gray-800 mt-1">
                                                {new Date(Number(order.date)).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Customer Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-semibold text-gray-800 mt-1">{order.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-semibold text-gray-800 mt-1">{order.phone}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold text-gray-800 mt-1">{order.email}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500">Delivery Address</p>
                                            <p className="font-semibold text-gray-800 mt-1">{order.address}, {order.city}</p>
                                        </div>
                                        {order.notes && (
                                            <div className="md:col-span-2 bg-blue-50 p-4 rounded-xl">
                                                <p className="text-sm text-blue-600 font-medium">Notes</p>
                                                <p className="text-gray-700 mt-1">{order.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Items */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-0">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Order Items</h3>
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-100"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="font-bold text-accent mt-1">
                                                        LKR {(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="mt-6 pt-4 border-t-2 border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-700">Total Amount</span>
                                            <span className="text-2xl font-bold text-accent">
                                                LKR {order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}