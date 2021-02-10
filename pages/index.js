import matter from "gray-matter";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";
import fs from "fs";
import path from "path";
import Link from "next/link";
import style from "../styles/Index.module.css";

const Index = ({ posts }) => {
  return (
    <div>
      <h1 className={style.title}>Christian Villamin's Site</h1>

      <p>
        I'm a software engineer currently working at{" "}
        <a href="https://www.hov.co/">High Output Ventures</a>.
      </p>

      <h2 className={style.portfolio}>Portfolio</h2>

      <ul>
        <li>
          <a href="https://www.her.vn/">her.vn</a>
        </li>
      </ul>

      <h2 className={style.portfolio}>Skills</h2>

      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>

      <h2 className={style.portfolio}>Blogs</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link
              as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/blog/[slug]`}
            >
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = () => {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
};

export default Index;
