import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="bCard">
      <Link to={`/blog/${post.slug}`} className="bThumb">
        <img src={post.cover} alt={post.title} />
      </Link>
      <div className="bBody">
        <p className="bMeta">
          <span>{new Date(post.date).toLocaleDateString()}</span> ·{" "}
          <span>{post.author}</span>
        </p>
        <h3 className="bTitle">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="bExcerpt">{post.excerpt}</p>
        <Link className="btn light" to={`/blog/${post.slug}`}>Read more</Link>
      </div>
    </article>
  );
}
