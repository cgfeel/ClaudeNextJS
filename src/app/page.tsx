import { BookmarkCard } from "@/components/BookmarkCard";
import { BookmarkCardProps } from "@/components/BookmarkCard/types";

const defaultProps: BookmarkCardProps = {
  title: "测试书签",
  url: "https://example.com",
  description: "这是一个测试书签的描述",
  tags: "react, typescript, nextjs",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight">
        欢迎使用 AICoding
      </h2>
      <p className="max-w-md text-center text-gray-600">
        基于 Claude Code
        构建的书签管理工具，支持收藏、搜索、分类管理你的在线资源。
      </p>
      <div className="flex gap-3">
        <a
          href="/api/bookmarks"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          查看书签 API
        </a>
      </div>
      <BookmarkCard {...defaultProps} />
    </div>
  );
}
