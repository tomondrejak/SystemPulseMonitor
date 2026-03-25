function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="statusInfo">
      <strong>Status: </strong>
      {isConnected ? <span className="connected">CONNECTED</span> : <span className="disconnected">DISCONNECTED</span>}
    </div>
  );
}

export default ConnectionStatus;
