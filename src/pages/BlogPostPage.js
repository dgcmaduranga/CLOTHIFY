import { useParams, Link } from "react-router-dom";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { posts } from "../data/posts";

export default function BlogPostPage(){
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <TopBars /><NavBar />
        <div className="container" style={{paddingBlock:24}}>
          <p>Post not found.</p>
          <Link to="/blog" className="btn light">Back to blog</Link>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:820}}>
        <p className="bMeta">
          <span>{new Date(post.date).toLocaleDateString()}</span> ·{" "}
          <span>{post.author}</span>
        </p>
        <h1 style={{margin:"6px 0 12px"}}>{post.title}</h1>
        <img src={post.cover} alt="" style={{width:"100%", borderRadius:12, margin:"6px 0 16px"}} />
        {/* content is safe demo HTML from our data file */}
        <div className="bContent" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div style={{marginTop:18}}>
          <Link to="/blog" className="btn light">← Back to blog</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
