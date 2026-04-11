import React from "react";

const QuestionAnswer = () => {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto  overflow-hidden">
        <div className="flex items-center justify-between px-7 py-4 border border-border-primary bg-white rounded-2xl mb-6">
          <span className="text-xl font-medium">Question (1/20)</span>
          <span
            id="timer"
            className="text-xl font-semibold px-16 py-4 rounded-lg bg-gray-100 transition-colors duration-300"
          >
            20:31 left
          </span>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Radio */}
          <div>
            <p className="text-xl font-medium mb-6 leading-relaxed">
              Q1. Which of the following indicators is used to measure market
              volatility?
            </p>
            <div className="flex flex-col gap-3">
              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="radio" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded-full bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Relative Strength Index (RSI)
                </span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="radio" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded-full bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Moving Average Convergence Divergence (MACD)
                </span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="radio" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded-full bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">Bollinger Bands</span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="radio" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded-full bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Fibonacci Retracement
                </span>
              </label>
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <p className="text-xl font-medium mb-6 leading-relaxed">
              Q2. Which of the following indicators is used to measure market
              volatility?
            </p>
            <div className="flex flex-col gap-3">
              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="checkbox" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Relative Strength Index (RSI)
                </span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="checkbox" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Moving Average Convergence Divergence (MACD)
                </span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="checkbox" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">Bollinger Bands</span>
              </label>

              <label className="option flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-150">
                <input type="checkbox" name="q1" className="hidden" />
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 flex items-center justify-center relative transition-colors duration-150">
                  <span className="hidden absolute w-2.5 h-2.5 rounded bg-violet-700 after-dot"></span>
                </div>
                <span className="text-sm text-gray-700">
                  Fibonacci Retracement
                </span>
              </label>
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <p className="text-xl font-medium mb-6 leading-relaxed">
              Q2. Which of the following indicators is used to measure market
              volatility?
            </p>
            <div className="">
							 {/* <OptionEditor /> */}
						</div>
          </div>
					
          <div className="flex items-center justify-between mt-8">
            <button className="btn-tertiary py-3!">Skip this Question</button>
            <button className="btn-primary">Save &amp; Continue</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;
