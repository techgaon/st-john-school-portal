import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SchoolStore } from '../store/schoolStore';
import { Student } from '../types';

interface FeePaymentProps {
  studentId: string;
  onNavigate: (view: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const FeePayment: React.FC<FeePaymentProps> = ({
  studentId,
  onNavigate,
  onSuccessToast
}) => {
  const student: Student | undefined = SchoolStore.getStudentById(studentId);

  // Flow stages: 'checkout' -> 'processing' -> 'success'
  const [stage, setStage] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [countdown, setCountdown] = useState(3);
  const [transactionId, setTransactionId] = useState('');

  const payableAmount = student?.pendingFeeAmount && student.pendingFeeAmount > 0
    ? student.pendingFeeAmount
    : 4850;

  // Processing stage timer
  useEffect(() => {
    let timer: any;
    if (stage === 'processing') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        const txId = `SJ-TXN-${Date.now().toString().slice(-8)}`;
        setTransactionId(txId);

        // Record receipt in persistent store & mark student fees paid
        if (student) {
          SchoolStore.addReceipt({
            id: `rcpt-${Date.now()}`,
            studentId: student.id,
            studentName: student.fullName,
            term: 'Term 4 (Tuition & Annual Dues)',
            amount: payableAmount,
            paidAt: new Date().toLocaleString(),
            transactionId: txId,
            paymentMode: selectedMethod,
            status: 'SUCCESS'
          });
        }

        setStage('success');

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.log('Confetti triggered');
        }
      }
    }
    return () => clearTimeout(timer);
  }, [stage, countdown]);

  if (!student) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <p className="text-sm text-on-surface-variant">Please log in to initiate fee payment.</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const startPayment = () => {
    setCountdown(3);
    setStage('processing');
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 max-w-xl mx-auto space-y-6">
      {/* 1. CHECKOUT STAGE */}
      {stage === 'checkout' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Dashboard</span>
            </button>
            <span className="font-label-sm text-xs bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant font-bold">
              256-Bit SSL Encrypted
            </span>
          </div>

          {/* Student Identity Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-high shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg shrink-0">
                {student.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-title-md text-base font-bold text-on-surface truncate">
                  {student.fullName}
                </h3>
                <p className="font-data-mono text-xs text-on-surface-variant">
                  Roll #{student.rollNo} • ID: {student.id} • {student.grade}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold uppercase">
                Q4 Fees
              </span>
            </div>

            {/* Payable Amount Box */}
            <div className="mt-4 p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div>
                <p className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">
                  Payable Tuition & Lab Fee
                </p>
                <p className="font-display-lg text-2xl sm:text-3xl font-extrabold text-primary">
                  ₹{payableAmount.toLocaleString()}
                  <span className="text-xs text-on-surface-variant font-normal">.00</span>
                </p>
              </div>
              <div className="text-right font-data-mono text-xs text-on-surface-variant">
                <span>Order Ref:</span>
                <p className="font-bold text-on-surface">#SJ-2026-Q4-9412</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-surface-container-high shadow-xs space-y-3">
            <h4 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider">
              Select Payment Method
            </h4>

            <div className="space-y-2">
              <label
                onClick={() => setSelectedMethod('UPI')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'UPI'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">qr_code_scanner</span>
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">UPI / QR Code</p>
                    <p className="text-xs text-on-surface-variant">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'UPI'}
                  onChange={() => setSelectedMethod('UPI')}
                  className="accent-primary"
                />
              </label>

              <label
                onClick={() => setSelectedMethod('Card')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'Card'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">credit_card</span>
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">Debit / Credit Card</p>
                    <p className="text-xs text-on-surface-variant">RuPay, Visa, Mastercard</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'Card'}
                  onChange={() => setSelectedMethod('Card')}
                  className="accent-primary"
                />
              </label>

              <label
                onClick={() => setSelectedMethod('NetBanking')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'NetBanking'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">account_balance</span>
                  <div>
                    <p className="font-label-md text-sm font-bold text-on-surface">Net Banking</p>
                    <p className="text-xs text-on-surface-variant">SBI, PNB, Baroda, HDFC, ICICI</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'NetBanking'}
                  onChange={() => setSelectedMethod('NetBanking')}
                  className="accent-primary"
                />
              </label>
            </div>

            <button
              onClick={startPayment}
              className="w-full h-12 rounded-xl bg-secondary text-on-secondary font-label-lg text-sm sm:text-base font-bold shadow-md hover:bg-secondary-container active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span>Proceed to Pay ₹{payableAmount.toLocaleString()}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. PROCESSING COUNTDOWN STAGE */}
      {stage === 'processing' && (
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-container-high shadow-lg text-center space-y-6">
          <div className="bg-secondary text-on-secondary px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold">
            <span className="material-symbols-outlined text-[16px] animate-pulse">lock</span>
            <span>Do not press Back or Refresh this screen</span>
          </div>

          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-surface-container animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="font-display-lg text-3xl font-extrabold text-primary">
              {countdown}s
            </div>
          </div>

          <div>
            <h3 className="font-headline-md text-lg font-bold text-primary">
              Processing Payment with Gateway
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Establishing 256-bit secure handshake with bank node...
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl font-data-mono text-xs text-on-surface-variant flex items-center justify-between">
            <span>Student: {student.fullName}</span>
            <span className="font-bold text-primary">₹{payableAmount}</span>
          </div>
        </div>
      )}

      {/* 3. SUCCESS DIGITAL FEE RECEIPT STAGE */}
      {stage === 'success' && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-surface-container-high shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed text-on-secondary-fixed mx-auto flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-xs font-bold uppercase tracking-wider">
              Payment Successful
            </span>
            <h2 className="font-headline-lg text-2xl font-bold text-primary mt-2">
              Official Digital Fee Receipt
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              St. John Public School • Shukul Bazar, Amethi (227811)
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-surface-container-low rounded-xl p-4 text-left space-y-2 text-xs font-body-sm border border-outline-variant/30">
            <div className="flex justify-between py-1 border-b border-surface-container-high">
              <span className="text-on-surface-variant">Transaction ID:</span>
              <span className="font-data-mono font-bold text-primary">{transactionId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high">
              <span className="text-on-surface-variant">Student Name:</span>
              <span className="font-bold text-on-surface">{student.fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high">
              <span className="text-on-surface-variant">Student ID / Roll:</span>
              <span className="font-data-mono text-on-surface">{student.id} (Roll #{student.rollNo})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high">
              <span className="text-on-surface-variant">Class & Stream:</span>
              <span className="text-on-surface">{student.grade} • {student.stream}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container-high">
              <span className="text-on-surface-variant">Payment Mode:</span>
              <span className="font-bold text-on-surface">{selectedMethod}</span>
            </div>
            <div className="flex justify-between py-1.5 pt-2">
              <span className="font-title-md text-sm font-bold text-primary">Amount Paid:</span>
              <span className="font-display-lg text-lg font-extrabold text-secondary">
                ₹{payableAmount.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                window.print();
                onSuccessToast('Preparing receipt for printing.');
              }}
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-sm font-bold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Receipt</span>
            </button>

            <button
              onClick={() => onNavigate('student-dashboard')}
              className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm font-bold transition-all flex items-center justify-center"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
