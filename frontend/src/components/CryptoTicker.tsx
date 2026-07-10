/**
 * Infinite marquee of blockchain / crypto tech badges.
 * Purely decorative — reinforces the Web3 identity.
 */
const items = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "ICP", name: "Internet Computer" },
  { symbol: "MATIC", name: "Polygon" },
  { symbol: "BNB", name: "BNB Chain" },
  { symbol: "Solidity", name: "Solidity" },
  { symbol: "Web3.js", name: "Web3" },
  { symbol: "Motoko", name: "Motoko" },
];

const Badge = ({ symbol, name }: { symbol: string; name: string }) => (
  <div className="mx-3 flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-card/40 px-4 py-2 backdrop-blur">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[10px] font-bold text-primary-foreground">
      {symbol.slice(0, 2)}
    </span>
    <span className="text-sm font-medium text-foreground/80">{symbol}</span>
    <span className="hidden text-xs text-muted-foreground sm:inline">{name}</span>
  </div>
);

export const CryptoTicker = () => {
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/20 py-4">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <Badge key={`${item.symbol}-${i}`} symbol={item.symbol} name={item.name} />
        ))}
      </div>
    </div>
  );
};
