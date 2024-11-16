import { Button } from "@/components/ui/button";
import { useUpdatePaymentMethodMutation } from "@/redux/features/order/orderApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface PaymentMethod {
    method: "COD" | "AamarPay";
    selected: boolean;
}

const Payment = () => {
    const { orderId } = useParams();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod["method"] | null>(null);
    const [updatePaymentMethod] = useUpdatePaymentMethodMutation();
    const navigate = useNavigate();


    const handlePaymentSelection = (method: PaymentMethod["method"]) => {
        setSelectedMethod(method);
    };


    const handlePaymentSubmit = async () => {
        if (selectedMethod === "COD") {
            const data = await updatePaymentMethod({ id: orderId }).unwrap();
            if (data && data?.success) {
                toast.success("Order placed successfully with Cash on Delivery!", { id: "paymentPageToastId" });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } else if (selectedMethod === "AamarPay") {
            // Integrate AamarPay logic here

            toast("Redirecting to AamarPay...", { id: "paymentPageToastId" });
        } else {
            toast.info("Please select a payment method!", { id: "paymentPageToastId" });
        }
    };

    const buttonText =
        selectedMethod ? selectedMethod === "COD"
            ? "Confirm Order"
            : "Proceed to Payment"
            : "Select a Option";


    return (
        <section className="min-h-screen bg-slate-100 pt-24 px-4 xl:px-0">
            <section className="max-w-7xl mx-auto bg-slate-200 p-8 py-14">
                <h1 className="text-3xl md:text-5xl font-bold mb-10">Payment Options</h1>

                <section className="grid lg:grid-cols-2 gap-10">
                    <section
                        className={`p-4 border cursor-pointer ${selectedMethod === "COD" ? "border-primary bg-primary text-white" : "border-gray-300"
                            }`}
                        onClick={() => handlePaymentSelection("COD")}
                    >
                        <h2 className="text-xl font-semibold">Cash on Delivery (COD)</h2>
                        <p className="text-sm white">Pay with cash when your order is delivered to your doorstep.</p>
                    </section>

                    <section
                        className={`p-4 border cursor-pointer ${selectedMethod === "AamarPay" ? "border-[#FE9A02] bg-[#FE9A02]" : "border-gray-300"
                            }`}
                        onClick={() => handlePaymentSelection("AamarPay")}
                    >
                        <h2 className="text-xl font-semibold">AamarPay</h2>
                        <p className="text-sm text-gray-800">Pay securely using AamarPay's payment gateway.</p>
                    </section>
                </section>

                <div className="mt-14 flex justify-end">
                    <Button
                        type="submit"
                        onClick={handlePaymentSubmit}
                        className="rounded-none text-2xl font-bold py-1">
                        {buttonText}
                    </Button>
                </div>
            </section>
        </section>
    );
};

export default Payment;
