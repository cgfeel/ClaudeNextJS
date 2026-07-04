/**
 * BookmarkCard 组件 Props 类型定义
 */
export interface BookmarkCardProps {
  /** 书签标题 */
  title: string;
  /** 书签 URL */
  url: string;
  /** 书签描述（可选） */
  description?: string | null;
  /** 标签列表，以逗号分隔的字符串 */
  tags?: string;
  /** 点击卡片的回调 */
  onClick?: () => void;
}
