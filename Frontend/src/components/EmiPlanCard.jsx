const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

function EmiPlanCard({
  upfrontPayment,
  emiStartDateFormatted,
  emiPlans = [],
  selectedPlanId,
  onSelectPlan,
  currentPlan,
  cashbackAmount,
}) {
  if (emiPlans.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-500 shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
        No EMI plans available for this variant.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.04)] sm:p-6">

      {/* Upfront Payment */}
      {upfrontPayment !== null && upfrontPayment !== undefined && (
        <div className="border-b border-gray-100 pb-3">
          <p className="text-base font-bold text-emerald-700 sm:text-lg">
            Pay only ₹{formatCurrency(upfrontPayment)} now
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3 py-3">
        <span className="text-sm font-bold text-gray-900">
          Choose EMI Tenure
        </span>

        {emiStartDateFormatted && (
          <span className="text-xs font-semibold text-emerald-700">
            EMIs starting {emiStartDateFormatted}
          </span>
        )}
      </div>

      {/* EMI Plans */}
      <div className="divide-y divide-gray-100">
        {emiPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isZeroPercent = Number(plan.interest_rate) === 0;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left transition ${
                isSelected
                  ? "bg-emerald-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">

                {/* Radio */}
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-emerald-700 bg-emerald-700"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>

                {/* EMI */}
                <span
                  className={`text-xs sm:text-[13px] ${
                    isSelected
                      ? "font-bold text-gray-950"
                      : "font-medium text-gray-800"
                  }`}
                >
                  ₹{formatCurrency(plan.monthly_payment)} ×{" "}
                  {plan.tenure_months} months
                </span>
              </div>

              {/* Interest */}
              <span
                className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold ${
                  isZeroPercent
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isZeroPercent
                  ? "0% EMI"
                  : `${plan.interest_rate}% EMI`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Plan */}
      {currentPlan && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
          Selected:{" "}
          <span className="font-semibold text-gray-900">
            {currentPlan.tenure_months} months
          </span>
        </div>
      )}

      {/* Cashback */}
      {Number(cashbackAmount) > 0 && (
        <p className="mt-3 text-xs font-medium text-emerald-700">
          ₹{formatCurrency(cashbackAmount)} cashback on this order
        </p>
      )}

    </div>
  );
}

export default EmiPlanCard;