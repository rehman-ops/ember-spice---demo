import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  Truck,
  Store,
  ArrowRight,
} from 'lucide-react';
import {
  MenuItem,
  MENU_ITEMS,
  RESTAURANT_INFO,
  SARGODHA_DELIVERY_ZONES,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: MenuItem) => void;
  onClearCart: () => void;
  onNavigateToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem,
  onClearCart,
  onNavigateToMenu,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedZone, setSelectedZone] = useState(SARGODHA_DELIVERY_ZONES[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
    summaryText: string;
    total: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const deliveryFee =
    orderType === 'delivery' && subtotal > 0 ? selectedZone.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  // Quick upsell sides not yet in cart
  const quickSides = MENU_ITEMS.filter(
    (m) =>
      ['garlic-butter-naan', 'mint-margarita', 'loaded-fries'].includes(m.id) &&
      !cart.some((c) => c.item.id === m.id)
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your name and phone number to continue.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your street / house address in Sargodha.');
      return;
    }

    setFormError('');
    const orderNumber = `ES-${Math.floor(1000 + Math.random() * 9000)}`;

    const lines = [
      `*New Demo Order — ${RESTAURANT_INFO.name} (Sargodha)*`,
      `Order Ref: #${orderNumber}`,
      `Order Type: ${orderType === 'delivery' ? `Delivery (${selectedZone.name})` : 'Self-Pickup (Main Boulevard)'}`,
      `Customer: ${customerName.trim()} (${customerPhone.trim()})`,
      orderType === 'delivery' ? `Address: ${deliveryAddress.trim()}` : '',
      orderNotes.trim() ? `Notes: ${orderNotes.trim()}` : '',
      `---`,
      ...cart.map(
        (c) =>
          `${c.quantity}x ${c.item.name} — PKR ${(
            c.item.price * c.quantity
          ).toLocaleString()}`
      ),
      `---`,
      `Subtotal: PKR ${subtotal.toLocaleString()}`,
      orderType === 'delivery'
        ? `Delivery Fee: PKR ${deliveryFee.toLocaleString()}`
        : 'Pickup: Free',
      `*Total Payable (Cash on Delivery/Pickup): PKR ${grandTotal.toLocaleString()}*`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${
      RESTAURANT_INFO.whatsappClean
    }?text=${encodeURIComponent(lines)}`;

    setSubmittedOrder({
      orderNumber,
      whatsappUrl,
      summaryText: lines,
      total: grandTotal,
    });
  };

  const handleResetAndClose = () => {
    setSubmittedOrder(null);
    onClearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Online Ordering & Cart"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg bg-[#181715] text-[#FAF7F2] h-full flex flex-col border-l border-[#FAF7F2]/12 shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#FAF7F2]/10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
              Your Order
            </h2>
            <p className="text-xs text-[#FAF7F2]/65 mt-0.5">
              Demo Direct Ordering · Instant WhatsApp Dispatch
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order drawer"
            className="w-10 h-10 rounded-lg border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:border-[#C5A059] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submittedOrder ? (
            <div className="bg-[#111110] border border-[#C5A059]/40 rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono-num text-[#C5A059]">
                    DEMO ORDER CONFIRMED · #{submittedOrder.orderNumber}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#FAF7F2] mt-1">
                    Ready for WhatsApp Dispatch
                  </h3>
                  <p className="text-sm text-[#FAF7F2]/75 mt-1 leading-relaxed">
                    In a live deployment for a Sargodha restaurant, this order is
                    sent straight to the restaurant’s WhatsApp order desk with
                    zero third-party commission fees.
                  </p>
                </div>
              </div>

              <div className="bg-[#181715] rounded-lg p-4 border border-[#FAF7F2]/10 text-xs font-mono-num text-[#FAF7F2]/85 whitespace-pre-wrap leading-relaxed">
                {submittedOrder.summaryText}
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={submittedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#111110] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Pre-Filled WhatsApp Message</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 px-4 rounded-lg border border-[#FAF7F2]/15 hover:border-[#C5A059] text-xs font-medium text-[#FAF7F2]/80 hover:text-[#FAF7F2] transition-colors"
                >
                  Start a New Demo Order
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-14 px-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 flex items-center justify-center mx-auto text-[#C5A059]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                Your Order Bag Is Empty
              </h3>
              <p className="text-sm text-[#FAF7F2]/70 max-w-xs mx-auto leading-relaxed">
                Explore our charcoal BBQ platters, sizzling iron-wok karahi,
                handcrafted burgers, and molten desserts.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToMenu();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold transition-colors"
              >
                <span>Browse Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Pickup vs Delivery Segmented Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                  1. Fulfilment Method
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#111110] rounded-lg border border-[#FAF7F2]/10">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      orderType === 'delivery'
                        ? 'bg-[#D95326] text-white'
                        : 'text-[#FAF7F2]/75 hover:text-[#FAF7F2]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Home Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      orderType === 'pickup'
                        ? 'bg-[#D95326] text-white'
                        : 'text-[#FAF7F2]/75 hover:text-[#FAF7F2]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Takeaway Pickup</span>
                  </button>
                </div>

                {orderType === 'delivery' ? (
                  <div className="bg-[#111110] rounded-lg p-3.5 border border-[#FAF7F2]/10 space-y-2">
                    <label
                      htmlFor="sargodha-zone"
                      className="block text-xs text-[#FAF7F2]/75"
                    >
                      Select Sargodha Delivery Area:
                    </label>
                    <select
                      id="sargodha-zone"
                      value={selectedZone.name}
                      onChange={(e) => {
                        const found = SARGODHA_DELIVERY_ZONES.find(
                          (z) => z.name === e.target.value
                        );
                        if (found) setSelectedZone(found);
                      }}
                      className="w-full bg-[#181715] border border-[#FAF7F2]/15 rounded-lg px-3 py-2 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D95326]"
                    >
                      {SARGODHA_DELIVERY_ZONES.map((zone) => (
                        <option key={zone.name} value={zone.name}>
                          {zone.name} ({zone.time} · PKR {zone.fee})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-[#C5A059] font-mono-num">
                      Estimated Delivery: {selectedZone.time} · Fee: PKR{' '}
                      {selectedZone.fee}
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#111110] rounded-lg p-3.5 border border-[#FAF7F2]/10 text-xs text-[#FAF7F2]/80 space-y-1">
                    <p className="font-semibold text-[#FAF7F2]">
                      Pickup Location: Main Boulevard, Sargodha
                    </p>
                    <p className="text-[#C5A059] font-mono-num">
                      Estimated Prep Time: 20–25 mins · No Delivery Fee
                    </p>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                    2. Selected Dishes ({cart.reduce((s, c) => s + c.quantity, 0)})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#FAF7F2]/60 hover:text-[#D95326] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3.5 p-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/10"
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        objectPosition={item.imagePosition}
                        className="w-16 h-16 rounded-md object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#FAF7F2] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs font-mono-num text-[#C5A059] mt-0.5">
                          PKR {(item.price * quantity).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-7 h-7 rounded bg-[#181715] border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2] hover:border-[#C5A059]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono-num w-6 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-7 h-7 rounded bg-[#181715] border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2] hover:border-[#C5A059]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from order`}
                        className="p-2 text-[#FAF7F2]/50 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Sides Pairing */}
              {quickSides.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-[#FAF7F2]/10">
                  <span className="block text-xs text-[#FAF7F2]/70">
                    Complete your meal with popular sides:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {quickSides.slice(0, 2).map((side) => (
                      <div
                        key={side.id}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#111110]/70 border border-[#FAF7F2]/8 text-xs"
                      >
                        <div>
                          <span className="font-medium text-[#FAF7F2]">
                            {side.name}
                          </span>
                          <span className="text-[#C5A059] font-mono-num ml-2">
                            +PKR {side.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddItem(side)}
                          className="px-2.5 py-1 rounded bg-[#FAF7F2]/10 hover:bg-[#D95326] text-[#FAF7F2] hover:text-white font-medium transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Details Form */}
              <form
                id="whatsapp-checkout-form"
                onSubmit={handleSubmitOrder}
                className="space-y-3.5 pt-3 border-t border-[#FAF7F2]/10"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                  3. Your Contact Details
                </span>

                {formError && (
                  <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs text-[#FAF7F2]/80 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Bilal Ahmed"
                    className="w-full bg-[#111110] border border-[#FAF7F2]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs text-[#FAF7F2]/80 mb-1"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g., 0300 1234567"
                    className="w-full bg-[#111110] border border-[#FAF7F2]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="block text-xs text-[#FAF7F2]/80 mb-1"
                    >
                      Delivery Address in Sargodha *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House #, Street #, Sector / Block"
                      className="w-full bg-[#111110] border border-[#FAF7F2]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="block text-xs text-[#FAF7F2]/80 mb-1"
                  >
                    Special Kitchen Instructions (Optional)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Spice level, extra mint raita, etc."
                    className="w-full bg-[#111110] border border-[#FAF7F2]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Sticky Footer inside Cart Drawer */}
        {!submittedOrder && cart.length > 0 && (
          <div className="p-6 bg-[#111110] border-t border-[#FAF7F2]/12 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#FAF7F2]/75">
                <span>Subtotal</span>
                <span className="font-mono-num">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#FAF7F2]/75">
                <span>
                  {orderType === 'delivery'
                    ? `Delivery (${selectedZone.name})`
                    : 'Takeaway Pickup'}
                </span>
                <span className="font-mono-num">
                  {orderType === 'delivery'
                    ? `PKR ${deliveryFee.toLocaleString()}`
                    : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#FAF7F2] pt-2 border-t border-[#FAF7F2]/10">
                <span>Total (Demo Order)</span>
                <span className="font-mono-num text-[#C5A059]">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="whatsapp-checkout-form"
              className="w-full py-3.5 px-5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
