import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWallet,
  withdrawAmount,
  clearWalletMsg,
} from "../../features/wallet/wallet.slice";

const ProviderWallet = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error, success } = useSelector((s) => s.wallet);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Wallet</h1>

      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error" onClick={() => dispatch(clearWalletMsg())}>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" onClick={() => dispatch(clearWalletMsg())}>
          {success}
        </div>
      )}

      {wallet && (
        <>
          {/* BALANCE */}
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Available Balance</div>
              <div className="stat-value text-success">
                ₹{wallet.balance}
              </div>
            </div>
          </div>

          {/* WITHDRAW */}
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-3">
              <h2 className="font-semibold">Withdraw Amount</h2>

              <input
                type="number"
                placeholder="Enter amount"
                className="input input-bordered"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                className="btn btn-primary btn-sm"
                disabled={!amount || amount <= 0}
                onClick={() => dispatch(withdrawAmount(Number(amount)))}
              >
                Request Withdraw
              </button>

              <p className="text-xs text-gray-500">
                * Withdraw requests are approved by admin
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProviderWallet;
