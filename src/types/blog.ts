export interface BlogFrontMatter {
    title: string;
    date: string;
    description: string;
    author?: string;
    tags?: string[];
  }
  
  export interface BlogPost extends BlogFrontMatter {
    slug: string;
  }
  
  export interface MdxFileData {
    content: string;
    frontMatter: BlogFrontMatter;
  }