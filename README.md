# PetStore — React Native Expo App

A mobile app built with React Native + Expo where users can browse pets, add their own listings, and manage a shopping cart with a live total.



#What This App Does

- Browse a list of pets (dogs, cats, birds, rabbits, fish)
- Add your own pet with a name, breed, price, and photo
- Pick a photo from your gallery or take one with your camera
- Tap Buy to add any pet to your cart
- View your cart with a running total amount
- Remove items from the cart anytime

---

#Tech Stack

| Tool | Purpose |
|------|---------|
| React Native | Core mobile framework |
| Expo | Dev tooling & build system |
| Expo Image Picker | Camera & gallery access |
| Zustand | Global state (cart store) |
| React Navigation | Tab navigation |
| React Hook Form | Form state & validation |
| SafeAreaView | Notch-safe layout |
| React Native Paper | UI components |

---

# Folder Structure

```
PetStore/
├── app/
│   ├── Screens/
│   │   ├── HomeScreen.jsx          # Home screen — pet listing
│   │   ├── FormScreen.jsx           # Add your own pet form
│   │   └── CardScreen.jsx           # Selected Item list
├── Store/
│   └── Store.ts     # Zustand Store
│   └── data.js      # Pet animals Data
├── assets/
│   └── images/                # Local pet images
└── README.md
```

---

# Getting Started

## 1. Clone the repo

```bash
git clone https://github.com/your-username/pet-store.git
cd pet-store
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the dev server

```bash
npx expo start
```

Scan the QR code with Expo Go on your phone, or press `a` for Android emulator / `i` for iOS simulator.

---

## How the Cart Works

The cart is managed using Zustand. When you press Buy on any pet card, that pet gets added to a global list. The cart screen reads from the same list and calculates the total by summing all prices.

```ts
// Store/Store.ts (simplified)
{
  list: [],
  addItem: (item) => ...,
  removeItem: (id) => ...,
  total: computed from list prices
}
```

---

# Adding Your Own Pet

On the *Add Pet* screen, fill in:

- **Name** — e.g. Bruno
- **Breed** — e.g. Husky
- **Price** — e.g. ₹12,000
- **Photo** — tap to pick from gallery or click with camera

Once submitted, the pet shows up on the home screen and can be added to the cart like any other listing.

---

## Form Handling with React Hook Form

The Add Pet form (`FormScreen.jsx`) uses **React Hook Form** to manage input state, validation, and error messages — replacing manual `useState` per field.

### Why React Hook Form?

- Removes boilerplate — no separate `useState` for each field
- Validation rules are declared inline on each field
- Errors are automatically tracked and cleared on correction
- Only re-renders the changed input, not the entire form

### Install

```bash
npm install react-hook-form
```

### How it's used

```

### Validation Rules Applied

| Field | Rules |
|-------|-------|
| Name | Required, min 2 chars, max 30 chars |
| Breed | Required, min 2 chars |
| Price | Required, numeric only, between ₹100 and ₹1,00,00,000 |
| Photo | Validated separately via `useState` (not a text input) |

On submit, `handleSubmit(onSubmit)` runs all validations before calling your handler. If any field fails, the form stops and shows inline error messages without any extra logic needed.

---

## Image Handling

React Native requires static images to be loaded with `require()` at build time. For user-uploaded images (picked from gallery or camera), Expo Image Picker returns a local URI which is passed directly into the `<Image source={{ uri: ... }} />` component.

```ts
// Static asset
image: require('../../assets/images/dog1.jpg')

// User picked image
image: { uri: result.assets[0].uri }
```

---

## Screens Overview

### Home Screen
- Lists all available pets in card format
- Each card shows photo, name, breed, and price
- **Buy** button turns grey once the pet is in the cart

### Add Pet Screen
- Form powered by React Hook Form with inline validation
- Validates that all fields are filled before submitting
- New pet appears instantly on the home screen

### Cart Screen
- Shows all added pets
- Displays individual prices and a grand total at the bottom
- Option to remove individual items

---

## Permissions Required

| Permission | Reason |
|------------|--------|
| Camera | Taking a photo of your pet |
| Media Library | Picking an existing image |

These are requested automatically by Expo when the user taps the image picker.

---

## Scripts

```bash
npx expo start          # Start development server
npx expo start --clear  # Clear cache and start
npx expo build          # Build for production
```

---

## Notes

- Prices are stored as strings with the ₹ symbol (e.g. `"₹15,000"`). Strip the symbol and commas before doing any arithmetic for the cart total.
- The cart state resets when the app is closed since there is no persistent storage. AsyncStorage can be added to keep cart data between sessions.
- All pet images in the default list are local assets. Only user-added pets use dynamic URIs.