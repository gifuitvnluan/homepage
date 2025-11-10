export default function Loading() {
  return (
    <>
      <div className="box loading-bg">
        <div className="image skeleton loading" style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} />
        <div className="content">
          <h3 style={{ marginBottom: '1rem' }}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h3>
          <p className="skeleton loading" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '1rem'}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
          <a href="#" className="btn skeleton loading" style={{margin: '0 auto'}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a>
        </div>
      </div>
    </>
  );
}
