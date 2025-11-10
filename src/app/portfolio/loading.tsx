export default function Loading() {
  return (
    <>
      <div className="box skeleton loading">
        <div className="image skeleton loading" style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} />
      </div>
    </>
  );
}
