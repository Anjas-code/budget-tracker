import { CURRENCY, NAVBAR_ITEM } from "./definitions";

export const NAVBAR_ITEMS: NAVBAR_ITEM[] = [
    {
        label: "dashboard",
        href: "/",
    },
    {
        label: "Transactions",
        href: "/transactions",
    },
    {
        label: "Manage",
        href: "/manage",
    },
];

export const CURRENCIES: CURRENCY[] = [
    { value: "USD", label: "$ Dollar", locale: "en-US" },
    { value: "EUR", label: "€ Euro", locale: "de-DE" },
    { value: "IDR", label: "Rp Rupiah", locale: "in-ID" },
];
