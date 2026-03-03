export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotals = (
  items: { unitPrice: number; quantity: number }[],
  taxType: 'none' | 'included' | 'added',
  discountType: 'amount' | 'percentage',
  discountValue: number
) => {
  // 1. Calculate Subtotal (Sum of Unit Price * Quantity)
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // 2. Calculate Discount
  let discountAmount = 0;
  if (discountType === 'amount') {
    discountAmount = discountValue;
  } else {
    discountAmount = Math.round(subtotal * (discountValue / 100));
  }
  
  // Ensure discount doesn't exceed subtotal
  discountAmount = Math.min(discountAmount, subtotal);

  const discountedSubtotal = subtotal - discountAmount;

  // 3. Calculate Tax
  let taxAmount = 0;
  let total = 0;

  if (taxType === 'added') {
    // 5% added on top of discounted subtotal
    taxAmount = Math.round(discountedSubtotal * 0.05);
    total = discountedSubtotal + taxAmount;
  } else if (taxType === 'included') {
    // Tax is already inside the price. 
    // Usually for "included", the total displayed IS the discountedSubtotal.
    // But we might want to show how much of that is tax.
    // Tax = Total - (Total / 1.05)
    total = discountedSubtotal;
    taxAmount = Math.round(total - (total / 1.05));
  } else {
    // None
    taxAmount = 0;
    total = discountedSubtotal;
  }

  return {
    subtotal,
    discountAmount,
    discountedSubtotal,
    taxAmount,
    total,
  };
};
