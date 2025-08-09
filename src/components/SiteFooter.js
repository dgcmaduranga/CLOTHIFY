export default function SiteFooter(){
  return (
    <footer className="footer">
      <div className="inner">
        <div>© {new Date().getFullYear()} MODEX</div>
        <div><small>Returns · Shipping · Privacy</small></div>
      </div>
    </footer>
  );
}
