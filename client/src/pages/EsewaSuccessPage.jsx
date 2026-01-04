import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEsewaVerify } from "../api/order-services";

const EsewaSuccessPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const [status, setStatus] = useState("loading");

  const { mutate, isPending } = useEsewaVerify();

  useEffect(() => {
    const payload = {
      order_id: id,
      data,
    };

    mutate(payload, {
      onSuccess: () => {
        setStatus("success");

        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      },
      onError: () => {
        setStatus("error");
      },
    });
  }, [mutate, navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-96">
        {/* LOADING */}
        {(status === "loading" || isPending) && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-emerald-700">
              Verifying your Esewa payment...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-emerald-600 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-emerald-700">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-600 mt-2">
              Your Esewa payment has been verified successfully.
            </p>
            <p className="text-gray-500 mt-3 text-sm">
              Redirecting to orders page in{" "}
              <span className="font-semibold text-emerald-600">
                5 seconds...
              </span>
            </p>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <h2 className="text-xl font-bold text-red-600">
              Payment Verification Failed ❌
            </h2>
            <p className="text-gray-600 mt-2">
              Something went wrong. Please contact support.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default EsewaSuccessPage;
