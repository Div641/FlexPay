const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0";
  return Math.round(Number(val)).toLocaleString("en-IN");
};

function EmiPlanCard({
  upfrontPayment = 0,
  emiStartDateFormatted = "3rd Oct",
  emiPlans = [],
  selectedPlanId,
  onSelectPlan,
  currentPlan,
  cashbackAmount = 0,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
      {/* Header: Pay only ₹[upfront] now */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-[#0e704e]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        <span className="text-base sm:text-lg font-bold text-[#0e704e]">
          Pay only ₹{formatCurrency(upfrontPayment)} now
        </span>
      </div>

      {/* Subheading: Choose EMI Tenure & Start Date */}
      <div className="flex items-center justify-between pt-3.5 pb-2">
        <span className="text-sm font-bold text-gray-900">Choose EMI Tenure</span>
        <span className="text-xs font-semibold text-[#0e704e]">
          EMIs starting {emiStartDateFormatted}
        </span>
      </div>

      {/* EMI Tenure Radio List */}
      <div className="divide-y divide-gray-100">
        {emiPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isZeroPercent = Number(plan.interest_rate) === 0;

          return (
            <label
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`flex items-center justify-between py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                isSelected ? "bg-emerald-50/50" : "hover:bg-gray-50/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-[#0e704e] bg-[#0e704e]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-xs sm:text-[13px] ${
                    isSelected ? "font-bold text-gray-950" : "font-medium text-gray-800"
                  }`}
                >
                  ₹{formatCurrency(plan.monthly_payment)} x {plan.tenure_months} months
                </span>
              </div>

              {/* Right badge: 0% EMI or 10.5% EMI */}
              {isZeroPercent ? (
                <span className="inline-flex items-center rounded-xs bg-[#eaf8ee] px-2 py-0.5 text-[11px] font-bold text-emerald-800 uppercase tracking-tight border border-emerald-200/60">
                  0% EMI
                </span>
              ) : (
                <span className="inline-flex items-center rounded-xs bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                  {plan.interest_rate}% EMI
                </span>
              )}
            </label>
          );
        })}
      </div>

      {/* Footnote */}
      <p className="text-[11px] text-gray-500 mt-3">
        *Total extra payment per month/order value
      </p>

      {/* Action Button: Buy on X months EMI */}
      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-[#2e7d32] hover:bg-[#256829] active:scale-[0.99] text-white py-3 px-4 flex flex-col items-center justify-center transition-all shadow-md shadow-emerald-900/10 cursor-pointer"
      >
        <span className="text-base font-bold leading-tight tracking-tight">
          Buy on {currentPlan?.tenure_months || 6} months EMI
        </span>
        <span className="text-xs font-normal text-emerald-100 leading-tight mt-0.5">
          Earn ₹{formatCurrency(cashbackAmount)} cashback on this order
        </span>
      </button>
    </div>
  );
}

export default EmiPlanCard;
