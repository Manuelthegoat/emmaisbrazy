import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="wrap page-top">
      <h1 className="page-title">Page not found</h1>
      <p className="lead">That address doesn't lead anywhere. Try the <Link className="ulink" to="/work">work page</Link> or go <Link className="ulink" to="/">home</Link>.</p>
    </section>
  );
}
