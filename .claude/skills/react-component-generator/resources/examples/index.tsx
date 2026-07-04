// index.tsx
import React from "react";
import type { BookmarkCardProps } from "./types.ts";

/**
 * 展示单个书签的卡片组件
 * @param props - 组件属性，包含标题、URL、标签等信息
 * @returns 渲染后的书签卡片组件
 */
export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  title,
  url,
  tags = [],
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(url)}
    >
      {/* 书签标题 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      {/* 书签URL */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm mb-2 block"
      >
        {url}
      </a>
      {/* 标签列表 */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
