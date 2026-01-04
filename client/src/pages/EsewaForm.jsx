import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const EsewaForm = () => {
  const location = useLocation()
  const esewaData = location?.state?.esewaData
  const formRef = useRef(null)

  useEffect(() => {
    if (esewaData && formRef.current) {
      // small delay so user can see redirect message
      setTimeout(() => {
        formRef.current.submit()
      }, 1500);
    }
  }, [esewaData])

  if (!esewaData) {
    return <p>Invalid payment request.</p>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-lg font-semibold">Redirecting to eSewa…</h2>
      <p className="text-sm text-gray-500">
        Please wait while we redirect you to the secure payment page.
      </p>

      <form
        ref={formRef}
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input type="hidden" name="amount" value={esewaData.amount} />
        <input type="hidden" name="tax_amount" value={esewaData.tax_amount} />
        <input type="hidden" name="total_amount" value={esewaData.total_amount} />
        <input
          type="hidden"
          name="transaction_uuid"
          value={esewaData.transaction_uuid}
        />
        <input type="hidden" name="product_code" value="EPAYTEST" />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input type="hidden" name="success_url" value={esewaData.success_url} />
        <input
          type="hidden"
          name="failure_url"
          value="https://developer.esewa.com.np/failure"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={esewaData.signature} />
      </form>
    </div>
  );
};

export default EsewaForm;
