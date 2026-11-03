import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  MapPin,
  Package,
  Heart,
  ShieldCheck,
  Edit,
  Save,
  Plus,
  Phone,
  Mail,
  LogOut,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { currentUser, updateUserProfile, logout, orders, wishlist, showToast } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <UserIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">You need to be logged in to view your account details.</p>
          <Link to="/login" className="px-5 py-2.5 bg-brand text-slate-950 font-bold text-xs rounded-xl">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone });
    setIsEditing(false);
    showToast('success', 'Profile details updated.');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand to-amber-400 text-slate-950 flex items-center justify-center font-bold text-2xl overflow-hidden shrink-0 shadow-sm border border-amber-300">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-10 h-10 text-brand" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 capitalize w-fit mx-auto sm:mx-0">
                {currentUser.role} Account
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-3">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentUser.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {currentUser.phone || 'Not added'}</span>
            </p>
          </div>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Edit Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </form>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/orders"
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Completed Orders</span>
              <p className="text-xl font-black text-slate-900">{orders.length}</p>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Saved to Wishlist</span>
              <p className="text-xl font-black text-slate-900">{wishlist.length}</p>
            </div>
          </Link>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Account Status</span>
              <p className="text-base font-black text-emerald-600">Verified Prime</p>
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand" />
              <h3 className="text-base font-bold text-slate-900">Saved Delivery Addresses</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Default Address for 1-Click Checkout</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentUser.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border-2 border-brand/40 bg-brand/5 text-xs space-y-1 relative"
              >
                <span className="absolute top-3 right-3 text-[10px] font-bold text-brand-dark bg-white px-2 py-0.5 rounded border border-brand/30">
                  Default
                </span>
                <p className="font-bold text-slate-900">{addr.fullName}</p>
                <p className="text-slate-600">{addr.streetAddress}, {addr.apartment}</p>
                <p className="text-slate-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-slate-500 pt-1 font-mono">{addr.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

