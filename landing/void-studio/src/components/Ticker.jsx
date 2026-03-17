const tickerContent = ['VOID STUDIO', '✦', 'VOID STUDIO', '✦', 'VOID STUDIO', '✦'];

export default function Ticker() {
  const doubledContent = [...tickerContent, ...tickerContent];

  return (
    <div className="bg-ink overflow-hidden py-4">
      <div className="flex ticker-animation whitespace-nowrap">
        {doubledContent.map((item, i) => (
          <span
            key={i}
            className="font-mono text-acid text-sm tracking-wider px-8"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
