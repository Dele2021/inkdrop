import React from 'react';
import { X } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { InkChainIcon } from './Icons';

export const AuthModal = ({ isOpen, onClose, onOpenCreateLink }) => {
  const { login, authenticated, user, logout, ready } = usePrivy();

  if (!isOpen) return null;

  const handleLogin = () => {
    console.log('Login clicked, ready:', ready, 'authenticated:', authenticated);
    login();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md bg-[#080b11] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {authenticated ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7132F5] to-purple-800 flex items-center justify-center mx-auto mb-4 text-white font-extrabold shadow-lg shadow-[#7132F5]/30">
              <InkChainIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Welcome back</h3>
            <p className="text-sm text-[#9CA3AF] mb-6">
              {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' + user?.wallet?.address?.slice(-4)}
            </p>
            <button
              onClick={() => { onOpenCreateLink?.(); onClose(); }}
              className="w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide mb-3 transition-all shadow-[0_0_20px_rgba(113,50,245,0.45)] min-h-[46px]"
            >
              Create Payment Link
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-sm text-[#9CA3AF] hover:text-white border border-white/10 hover:border-white/20 transition-all min-h-[42px]"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7132F5] to-purple-800 flex items-center justify-center mx-auto mb-4 text-white font-extrabold shadow-lg shadow-[#7132F5]/30">
              <InkChainIcon size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Log in to InkDrop</h3>
            <p className="text-xs text-[#9CA3AF] mb-8">
              Email, MetaMask, Coinbase Wallet and more — powered by Privy.
            </p>

            <button
              onClick={handleLogin}
              disabled={false}
              className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] disabled:opacity-50 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(113,50,245,0.45)] min-h-[52px]"
            >
              Connect Wallet or Email
            </button>

            <p className="text-xs text-[#9CA3AF] mt-4">
              Non-custodial · No seed phrases · Ink Chain
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
