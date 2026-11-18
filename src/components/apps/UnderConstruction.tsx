export function UnderConstruction({ what, detail }: { what: string; detail: string }) {
  return (
    <div className="construction">
      <img src="/icons/warning.png" alt="" width={72} height={72} />
      <p className="construction__sign">Under construction</p>
      <p>
        <strong>{what}</strong> {what.endsWith('s') ? 'are' : 'is'} coming soon. {detail}
      </p>
      <div className="rainbow-bar construction__bar" role="presentation" />
    </div>
  );
}
