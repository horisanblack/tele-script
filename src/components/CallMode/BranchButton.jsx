import './BranchButton.css';

export default function BranchButton({ label, onClick }) {
  return (
    <button className="branch-btn" onClick={onClick}>
      <span className="branch-btn-arrow">→</span>
      {label}
    </button>
  );
}
