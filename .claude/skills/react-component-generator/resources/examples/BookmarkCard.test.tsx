// BookmarkCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookmarkCard } from "./index";
import type { BookmarkCardProps } from "./types.tsx";

/**
 * BookmarkCard 组件测试套件
 * 验证组件渲染、Props 传递、交互逻辑
 */
describe("BookmarkCard Component", () => {
  const defaultProps: BookmarkCardProps = {
    title: "GitHub Homepage",
    url: "https://github.com",
    tags: ["code", "version control"],
  };

  /**
   * 渲染测试：验证组件核心元素正常显示
   */
  test("renders all core elements (title, url, tags)", () => {
    render(<BookmarkCard {...defaultProps} />);

    // 验证标题
    expect(screen.getByText("GitHub Homepage")).toBeInTheDocument();
    // 验证URL
    expect(
      screen.getByRole("link", { name: /https:\/\/github.com/ }),
    ).toBeInTheDocument();
    // 验证标签
    expect(screen.getByText("code")).toBeInTheDocument();
    expect(screen.getByText("version control")).toBeInTheDocument();
  });

  /**
   * 交互测试：验证点击事件回调触发
   */
  test("triggers onClick callback when clicked", () => {
    const mockOnClick = jest.fn();
    const props = { ...defaultProps, onClick: mockOnClick };

    render(<BookmarkCard {...props} />);
    fireEvent.click(screen.getByRole("link").closest("div")!);

    // 验证回调被调用，且传递正确的URL
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith("https://github.com");
  });

  /**
   * 边界测试：标签为空时不渲染标签区域
   */
  test("does not render tags section when tags are empty", () => {
    const props = { ...defaultProps, tags: [] };
    const { container } = render(<BookmarkCard {...props} />);

    const tagSection = container.querySelector(".flex.flex-wrap.gap-2");
    expect(tagSection?.children).toHaveLength(0);
  });
});
