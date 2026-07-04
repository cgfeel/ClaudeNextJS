// types.ts
/**
 * BookmarkCard 组件属性接口
 */
export interface BookmarkCardProps {
  /** 书签标题 */
  title: string;
  /** 书签链接URL */
  url: string;
  /** 书签标签列表（可选） */
  tags?: string[];
  /** 卡片点击事件回调（可选） */
  onClick?: (url: string) => void;
}