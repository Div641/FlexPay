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
      <div className="space-y-2">
        {emiPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isZeroPercent = Number(plan.interest_rate) === 0;
          const cashback = Number(plan.cashback_amount || 0);

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
              aria-pressed={isSelected}
              className={`w-full rounded-xl border p-3 text-left transition-all duration-200 sm:p-4 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {/* Radio */}
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-emerald-700 bg-emerald-700"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>

                  {/* Monthly Payment */}
                  <div className="min-w-0">
                    <p
                      className={`text-sm sm:text-base ${
                        isSelected
                          ? "font-bold text-gray-950"
                          : "font-semibold text-gray-900"
                      }`}
                    >
                      ₹{formatCurrency(plan.monthly_payment)}
                      <span className="font-medium text-gray-500">
                        {" "}
                        / month
                      </span>
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {plan.tenure_months} months
                    </p>
                  </div>
                </div>

                {/* Interest */}
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold ${
                    isZeroPercent
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isZeroPercent
                    ? "0% Interest"
                    : `${plan.interest_rate}% Interest`}
                </span>
              </div>

              {/* Cashback */}
              {cashback > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-2">
                  <p className="text-xs font-semibold text-emerald-700">
                    ₹{formatCurrency(cashback)} cashback
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Plan Summary */}
      {currentPlan && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <p className="text-xs text-gray-600">
            Selected EMI
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-gray-900">
            <span>
              ₹{formatCurrency(currentPlan.monthly_payment)}/month
            </span>

            <span className="text-gray-400">•</span>

            <span>
              {currentPlan.tenure_months} months
            </span>

            <span className="text-gray-400">•</span>

            <span>
              {Number(currentPlan.interest_rate) === 0
                ? "0% interest"
                : `${currentPlan.interest_rate}% interest`}
            </span>
          </div>

          {Number(currentPlan.cashback_amount) > 0 && (
            <p className="mt-1 text-xs font-medium text-emerald-700">
              ₹{formatCurrency(currentPlan.cashback_amount)} cashback
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default EmiPlanCard;