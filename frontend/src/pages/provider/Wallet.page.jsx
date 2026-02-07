// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchWallet,
//   withdrawAmount,
// } from "../../features/wallet/wallet.slice";

// const WalletPage = () => {
//   const dispatch = useDispatch();
//   const { balance, commission, withdrawable, loading } = useSelector(
//     (s) => s.wallet
//   );

//   const [amount, setAmount] = useState("");

//   useEffect(() => {
//     dispatch(fetchWallet());
//   }, [dispatch]);

//   const handleWithdraw = () => {
//     if (!amount || amount <= 0) {
//       return alert("Enter valid amount");
//     }

//     if (amount > withdrawable) {
//       return alert("Insufficient balance");
//     }

//     dispatch(withdrawAmount(Number(amount))).then(() => {
//       dispatch(fetchWallet());
//       setAmount("");
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Wallet</h1>

//       {/* STATS */}
//       <div className="grid grid-cols-3 gap-4">
//         <div className="stat bg-base-100 shadow">
//           <div className="stat-title">Total Balance</div>
//           <div className="stat-value">₹{balance}</div>
//         </div>

//         <div className="stat bg-base-100 shadow">
//           <div className="stat-title">Commission</div>
//           <div className="stat-value text-error">
//             ₹{commission}
//           </div>
//         </div>

//         <div className="stat bg-base-100 shadow">
//           <div className="stat-title">Withdrawable</div>
//           <div className="stat-value text-success">
//             ₹{withdrawable}
//           </div>
//         </div>
//       </div>

//       {/* WITHDRAW */}
//       <div className="card bg-base-100 shadow">
//         <div className="card-body space-y-4">
//           <h2 className="text-lg font-semibold">
//             Withdraw Amount
//           </h2>

//           <input
//             type="number"
//             className="input input-bordered w-full"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <button
//             className="btn btn-primary"
//             disabled={loading}
//             onClick={handleWithdraw}
//           >
//             {loading ? "Processing..." : "Withdraw"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletPage;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWallet,
  withdrawRequest,
  clearWalletMsg,
} from "../../features/wallet/wallet.slice";

const WalletPage = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error, success } = useSelector(
    (s) => s.wallet
  );

  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  const handleWithdraw = () => {
    if (!amount || amount <= 0) return;
    dispatch(withdrawRequest(Number(amount)));
    setAmount("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Wallet</h1>

      {loading && (
        <span className="loading loading-spinner loading-lg"></span>
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
        <div className="grid grid-cols-3 gap-4">
          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Balance</div>
            <div className="stat-value text-success">
              ₹{wallet.balance}
            </div>
          </div>

          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Commission</div>
            <div className="stat-value text-warning">
              ₹{wallet.commission}
            </div>
          </div>

          <div className="stat bg-base-100 shadow">
            <div className="stat-title">Earnings</div>
            <div className="stat-value">
              ₹{wallet.providerAmount}
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAW */}
      <div className="card bg-base-100 shadow max-w-md">
        <div className="card-body space-y-3">
          <h2 className="font-semibold">Withdraw Amount</h2>

          <input
            type="number"
            className="input input-bordered"
            placeholder="Enter amount"
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

