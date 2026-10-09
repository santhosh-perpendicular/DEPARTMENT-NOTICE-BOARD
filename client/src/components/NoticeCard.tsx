interface NoticeCardProps {
  title: string;
  message: string;
}

// Reusable component that displays one notice
function NoticeCard({ title, message }: NoticeCardProps) {
  return (
    <div className="notice-card">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default NoticeCard;
