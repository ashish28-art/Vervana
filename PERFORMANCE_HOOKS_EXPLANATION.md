# Understanding `useCallback` and `useMemo` Hooks

## Overview
Both `useCallback` and `useMemo` are React performance optimization hooks that help prevent unnecessary re-renders and recalculations. They're part of React's memoization strategy.

---

## 🔄 `useCallback` - Memoizing Functions

### What it does:
`useCallback` returns a **memoized version of a function** that only changes if one of its dependencies has changed.

### Syntax:
```javascript
const memoizedCallback = useCallback(
  () => {
    // function logic
  },
  [dependencies] // array of dependencies
);
```

### Why it's needed:
In JavaScript, functions are recreated on every render. When you pass a function as a prop or include it in a dependency array, React sees it as a "new" function each time, causing unnecessary re-renders.

### Example from your CartContext:

**❌ WITHOUT useCallback (Problem):**
```javascript
const addToCart = (product) => {
  setCartItems((prevItems) => {
    // ... logic
  });
};
// This function is recreated on EVERY render
// Components using this function will re-render unnecessarily
```

**✅ WITH useCallback (Solution):**
```javascript
const addToCart = useCallback((product) => {
  setCartItems((prevItems) => {
    const uniqueId = `${product.id}-${product.size}`;
    const existingItem = prevItems.find((i) => i.uniqueId === uniqueId);
    
    if (existingItem) {
      return prevItems.map((i) =>
        i.uniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      return [...prevItems, { ...product, quantity: 1, uniqueId }];
    }
  });
}, []); // Empty array = function never changes
```

**Key Points:**
- Empty dependency array `[]` = function is created once and never changes
- If dependencies change, the function is recreated
- Example: `getTotalPrice` depends on `cartItems`, so it's in the dependency array

### Real Example from your code:

```javascript
// In CartContext.jsx - Line 34-39
const getTotalPrice = useCallback(() => {
  return cartItems.reduce((total, item) => {
    const price = Number(item.price);
    return total + price * item.quantity;
  }, 0);
}, [cartItems]); // Recreates only when cartItems changes
```

```javascript
// In Home.jsx - Line 54-56
const handleScrollToCategories = useCallback(() => {
  categoryRef.current?.scrollIntoView({ behavior: "smooth" });
}, []); // Never changes, no dependencies needed
```

---

## 💾 `useMemo` - Memoizing Values

### What it does:
`useMemo` returns a **memoized value** that only recalculates when its dependencies change.

### Syntax:
```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b] // dependencies
);
```

### Why it's needed:
Expensive calculations (like filtering large arrays, complex computations) run on every render. `useMemo` caches the result and only recalculates when dependencies change.

### Example from your Men.jsx:

**❌ WITHOUT useMemo (Problem):**
```javascript
const filteredItems = items.filter((item) => {
  const matchesCategory = safeCategory === "all" || 
    item?.category?.toLowerCase().includes(safeCategory);
  const matchesSearch = item?.title?.toLowerCase().includes(safeSearch);
  
  if (safeSearch !== "") return matchesSearch;
  return matchesCategory;
});
// This filtering runs on EVERY render, even if items/search/category didn't change!
```

**✅ WITH useMemo (Solution):**
```javascript
const filteredItems = useMemo(() => {
  return items.filter((item) => {
    const matchesCategory =
      safeCategory === "all" ||
      item?.category?.toLowerCase().includes(safeCategory);
    
    const matchesSearch =
      item?.title?.toLowerCase().includes(safeSearch);
    
    if (safeSearch !== "") {
      return matchesSearch;
    }
    
    return matchesCategory;
  });
}, [items, safeCategory, safeSearch]); 
// Only recalculates when items, safeCategory, or safeSearch changes
```

### Real Examples from your code:

```javascript
// In Men.jsx - Line 12-13
const safeSearch = useMemo(() => text?.toLowerCase() || "", [text]);
const safeCategory = useMemo(() => selectedCategory?.toLowerCase() || "all", [selectedCategory]);
// These simple transformations are memoized to prevent unnecessary recalculations
```

```javascript
// In Men.jsx - Line 33-48
const filteredItems = useMemo(() => {
  return items.filter((item) => {
    // ... filtering logic
  });
}, [items, safeCategory, safeSearch]);
// Expensive filtering operation only runs when dependencies change
```

---

## 📊 Comparison Table

| Feature | `useCallback` | `useMemo` |
|---------|--------------|-----------|
| **Returns** | Memoized function | Memoized value |
| **Use Case** | Functions passed as props | Expensive calculations |
| **Prevents** | Function recreation | Value recalculation |
| **Example** | Event handlers, callbacks | Filtered arrays, computed values |

---

## 🎯 When to Use Each

### Use `useCallback` when:
1. ✅ Passing functions as props to memoized components (`React.memo`)
2. ✅ Functions are dependencies of other hooks (`useEffect`, `useMemo`)
3. ✅ Functions are passed to child components frequently
4. ✅ Functions are used in Context providers

**Your examples:**
- `addToCart`, `removeFromCart` in CartContext (passed via Context)
- `handleScrollToCategories` in Home.jsx (event handler)

### Use `useMemo` when:
1. ✅ Expensive calculations (filtering, sorting large arrays)
2. ✅ Derived values that are used multiple times
3. ✅ Values passed to memoized components
4. ✅ Preventing object/array recreation in dependencies

**Your examples:**
- `filteredItems` in Men.jsx (expensive filtering)
- `safeSearch`, `safeCategory` (derived values)

---

## ⚠️ Common Mistakes

### 1. Overusing these hooks
```javascript
// ❌ DON'T - Simple calculation doesn't need memoization
const sum = useMemo(() => a + b, [a, b]);

// ✅ DO - Only memoize expensive operations
const expensiveResult = useMemo(() => {
  return hugeArray.filter(/* complex logic */);
}, [hugeArray]);
```

### 2. Wrong dependencies
```javascript
// ❌ DON'T - Missing dependency
const filtered = useMemo(() => items.filter(i => i.price > minPrice), [items]);
// Missing 'minPrice' in dependencies!

// ✅ DO - Include all dependencies
const filtered = useMemo(() => items.filter(i => i.price > minPrice), [items, minPrice]);
```

### 3. Memoizing everything
```javascript
// ❌ DON'T - Not all functions need useCallback
const simpleHandler = useCallback(() => console.log('click'), []);

// ✅ DO - Only memoize when it provides benefit
const expensiveHandler = useCallback(() => {
  // Complex logic that benefits from memoization
}, [deps]);
```

---

## 🔍 How It Works in Your Codebase

### Context Optimization (CartContext.jsx):
```javascript
// Functions are memoized so components consuming the context
// don't re-render unnecessarily when the provider re-renders
const addToCart = useCallback((product) => { /* ... */ }, []);
const removeFromCart = useCallback((uniqueId) => { /* ... */ }, []);
// These functions maintain the same reference across renders
```

### Component Optimization (Men.jsx):
```javascript
// Expensive filtering only runs when items/search/category changes
const filteredItems = useMemo(() => {
  return items.filter(/* complex logic */);
}, [items, safeCategory, safeSearch]);
// If component re-renders for other reasons, filteredItems stays cached
```

---

## 📈 Performance Impact

**Before optimization:**
- Every render = new functions created
- Every render = expensive calculations run
- Child components re-render unnecessarily
- Context consumers re-render on every provider update

**After optimization:**
- Functions maintain same reference (unless deps change)
- Expensive calculations cached
- Fewer unnecessary re-renders
- Better performance, especially with large lists

---

## 🎓 Summary

- **`useCallback`**: "Remember this function, only recreate if dependencies change"
- **`useMemo`**: "Remember this value, only recalculate if dependencies change"

Both hooks help React skip unnecessary work, leading to better performance! 🚀
