import React from 'react';
import { Shield, FileText, RotateCcw, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
              <p className="text-xs text-slate-400">Last Updated: October 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              SmartBiz Store is committed to safeguarding your privacy and protecting your personal information. This Privacy Policy details our data collection, usage, and security practices in compliance with applicable Indian information technology and digital personal data protection laws.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h3>
            <p>
              When you purchase or register on our website, we collect your name, email address, phone number, shipping address, and order transaction details. We do not store full credit/debit card numbers or CVV; all payment processing is encrypted through PCI-DSS certified payment gateways.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">2. How We Use Your Data</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To fulfill and dispatch your orders to your designated shipping location.</li>
              <li>To transmit order status alerts, SMS delivery tracking codes, and digital tax receipts.</li>
              <li>To provide seamless customer support and process returns or refunds.</li>
              <li>To prevent fraudulent transactions and maintain platform security.</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900 pt-2">3. Data Sharing & Security</h3>
            <p>
              We never sell or rent your personal information to third parties. We only share necessary delivery details with verified courier partners (such as BlueDart, Delhivery) strictly to fulfill shipping to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Terms & Conditions</h1>
              <p className="text-xs text-slate-400">Effective Date: October 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Welcome to SmartBiz Store. By accessing or using our website, storefront, and services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">1. Storefront Architecture</h3>
            <p>
              SmartBiz Store operates an independent merchant commerce experience inspired by Amazon SmartBiz usability and architectural principles. All trade names, product specifications, and warranties are authentic and verified by respective manufacturers.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">2. Pricing and Payments</h3>
            <p>
              All prices listed on the site are in Indian Rupees (₹) and include applicable Goods and Services Tax (GST). We reserve the right to correct any typographical pricing errors prior to shipment.
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">3. Product Warranty</h3>
            <p>
              All branded electronic items, audio gear, and appliances carry the full manufacturer warranty as stated in the product description. Warranty claims can be registered directly with the authorized brand service centers across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Return & Refund Policy</h1>
              <p className="text-xs text-slate-400">Guaranteed Doorstep Protection</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              At SmartBiz Store, we stand firmly behind the quality of every product we sell. We offer a transparent, buyer-friendly <strong>7-Day Easy Replacement & Return Policy</strong>.
            </p>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">7-Day Free Doorstep Pickup</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  If your product is damaged, defective, or not as described, request a return within 7 days of delivery. Our courier will pick up the item directly from your address at zero extra charge.
                </p>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 pt-2">How to Initiate a Return</h3>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Log in and visit your <strong>Order History</strong>.</li>
              <li>Select the order and click <strong>Request Return / Replacement</strong>.</li>
              <li>Provide a brief description of the issue.</li>
              <li>Keep the item in its original box with all accessories, manuals, and warranty cards.</li>
              <li>Our logistics partner will arrive within 24-48 hours for doorstep pickup and verification.</li>
            </ol>

            <h3 className="text-base font-bold text-slate-900 pt-2">Refund Processing Times</h3>
            <p>
              Upon successful pickup and verification at our warehouse, refunds are initiated immediately to your original payment method:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>UPI / Net Banking:</strong> 2 to 4 hours.</li>
              <li><strong>Credit / Debit Cards:</strong> 2 to 5 business days depending on your issuing bank.</li>
              <li><strong>Cash on Delivery (COD):</strong> Instant bank transfer via NEFT or UPI payout link.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

