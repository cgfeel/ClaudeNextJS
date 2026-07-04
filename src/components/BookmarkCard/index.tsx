"use client";
/**
 * BookmarkCard 组件
 * 展示单个书签的卡片，显示标题、URL、描述和标签列表
 */

import type { BookmarkCardProps } from "./types";

export function BookmarkCard({
  title,
  url,
  description,
  tags,
  onClick,
}: BookmarkCardProps) {
  const tagList = tags
    ? tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
        {title}
      </h3>

      {/* URL */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-1 block truncate text-sm text-blue-500 hover:underline"
      >
        {url}
      </a>

      {/* 描述 */}
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}

      {/* 标签列表 */}
      {tagList.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
