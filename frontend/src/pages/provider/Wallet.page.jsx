import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearWalletMsg, fetchWallet, withdrawAmount } from "../../features/wallet/providerWallet.slice";
// import {
//   fetchWallet,
//   withdrawAmount,
//   clearWalletMsg,
// } from "../../features/providerWallet/providerWallet.slice";

const WalletPage = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error, successMsg } = useSelector(
    (s) => s.providerWallet
  );

  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) return;
    dispatch(withdrawAmount(Number(amount)));
    setAmount("");
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Wallet</h1>

      {loading && (
        <span className="loading loading-spinner"></span>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success">
          <span>{successMsg}</span>
          <button
            className="btn btn-xs"
            onClick={() => dispatch(clearWalletMsg())}
          >
            ✕
          </button>
        </div>
      )}

      {/* WALLET CARD */}
      {wallet && (
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Balance</div>
            <div className="stat-value text-primary">
              ₹{wallet.balance}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Commission</div>
            <div className="stat-value text-error">
              ₹{wallet.commission || 0}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Earnings</div>
            <div className="stat-value text-success">
              ₹{wallet.providerAmount || 0}
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAW */}
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-3">
          <h2 className="font-semibold">Withdraw Amount</h2>

          <input
            type="number"
            placeholder="Enter amount"
            className="input input-bordered w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={handleWithdraw}
          >
            Request Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
