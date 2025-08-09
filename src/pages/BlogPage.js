import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import BlogCard from "../components/BlogCard";
import { posts } from "../data/posts";

export default function BlogPage(){
  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24}}>
        <h1 style={{marginBottom:12}}>Blog</h1>
        <p style={{color:"#666", marginBottom:18}}>
          Style tips, care guides, and behind-the-scenes from Violet.
        </p>
        <div className="bGrid">
          {posts.map(p => <BlogCard key={p.id} post={p} />)}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
