import "../secure.css";

const CallDialog = ({ onConfirm, onCancel }) => (
  <div className="overlay">
    <div className="call-dialog">
      <div className="call-icon">📞</div>
      <h2>Emergency Call</h2>
      <div className="call-number">112</div>
      <p>Do you want to call emergency services?</p>
      <div className="call-actions">
        <button className="btn-call" onClick={onConfirm}>📞 Call Now</button>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default CallDialog;
