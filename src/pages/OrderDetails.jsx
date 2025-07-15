import Header4 from "../components/Header4";
import OrderStatus from "../components/myorder/OrderStatus";
import { ChevronRight } from "lucide-react";
const OrderDetails = () => {
  return (
    <div className="bg-gray-200">
      <Header4 title="" />
      <div className="px-4 border-b pb-2 mt-[52px] bg-white">
        <span className="text-[13px] text-gray-400">
          Order ID - OD364623767432766
        </span>
      </div>

      <div className="flex border-b bg-white justify-between items-start border p-4 w-full mx-auto">
        <div className="flex flex-col space-y-1">
          <h2 className="leading-tight line-clamp-2 max-w-[270px]">
            PTron InTunes Ace with 38 Hrs Playback, Clear Calls, Deep Bas PTron
            InTunes Ace with 38 Hrs Playback, Clear Calls, Deep Bas
          </h2>
          <p className="text-xs text-gray-500">Green</p>
          <p className="text-xs text-gray-500">Seller: TBL Online</p>
          <p className="mt-1">₹557</p>
        </div>
        <img
          src="/assets/images/product/bodyguard-jacket_0.jpg" // Replace with actual image path
          alt="PTron InTunes Ace"
          className="w-16 h-16 object-contain"
        />
      </div>
      <OrderStatus />
      <div className="flex text-blue-700 text-sm bg-white px-4 pb-4">
        <p>See All Updates</p>
        <ChevronRight />
      </div>
      <div className="flex border-t border-b-4 text-sm bg-white shadow-lg divide-x">
        <div className="w-1/2 p-4 flex items-center justify-center">
          <p>Edit Order</p>
        </div>
        <div className="w-1/2 p-4 flex items-center justify-center gap-2">
          <img
            src="/assets/images/ic/chat.png"
            alt="Chat Icon"
            className="w-6 h-6"
          />
          <p>Chat with us</p>
        </div>
      </div>

      <div className="bg-white text-sm text-black">
        {/* Tracking info */}
        <div className="px-4 py-3 border-b">
          <p>
            Order can be tracked by{" "}
            <span className="font-medium">6202554185</span>.
          </p>
          <p>Tracking link is shared via SMS.</p>
        </div>

        {/* Manage access */}
        <div className="flex items-center justify-between px-4 py-4 border-b cursor-pointer">
          <p>Manage who can access</p>
          <ChevronRight size={20} />
          {/* Right arrow (can be replaced with icon if needed) */}
        </div>

        {/* Rate your experience */}
        <div className="px-4 py-4 border-b text-gray-500 text-xs">
          Rate your experience
        </div>
        <div className="flex items-center px-4 py-3 cursor-pointer">
          <img
            src="/assets/images/ic/feedback.png"
            alt="Thumbs up"
            className="w-5 h-5 mr-2"
          />
          <p className="text-sm text-black">Did you find this page helpful?</p>
        </div>
      </div>
      <div className="mb-8"></div>
    </div>
  );
};

export default OrderDetails;
