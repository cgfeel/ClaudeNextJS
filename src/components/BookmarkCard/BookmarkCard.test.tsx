import React from "react";
import { render, screen } from "@testing-library/react";
import { BookmarkCard } from "./index";
import type { BookmarkCardProps } from "./types";

/**
 * BookmarkCard 组件测试套件
 * 验证组件渲染、Props 传递等核心功能
 */
describe("BookmarkCard Component", () => {
  const defaultProps: BookmarkCardProps = {
    title: "测试书签",
    url: "https://example.com",
    description: "这是一个测试书签的描述",
    tags: "react, typescript, nextjs",
  };

  /**
   * 渲染测试：验证组件能正常挂载且无报错
   */
  test("renders the component without crashing", () => {
    const { container } = render(<BookmarkCard {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  /**
   * Props 传递测试：验证传入的 Props 能正确渲染到 DOM 中
   */
  test("displays the correct content based on props", () => {
    render(<BookmarkCard {...defaultProps} />);

    // 验证标题
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    // 验证 URL
    expect(screen.getByText(defaultProps.url)).toBeInTheDocument();
    // 验证描述
    expect(screen.getByText(defaultProps.description!)).toBeInTheDocument();
  });

  /**
   * 标签渲染测试：验证逗号分隔的标签字符串能正确渲染为标签列表
   */
  test("renders tags correctly from comma-separated string", () => {
    render(<BookmarkCard {...defaultProps} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
  });

  /**
   * 无标签测试：验证标签为空时不渲染标签区域
   */
  test("does not render tags when tags prop is empty", () => {
    const propsWithoutTags: BookmarkCardProps = {
      title: "无标签书签",
      url: "https://example.com",
    };

    const { container } = render(<BookmarkCard {...propsWithoutTags} />);

    // 不应该有标签 span 元素
    const tagElements = container.querySelectorAll("span");
    expect(tagElements.length).toBe(0);
  });

  /**
   * 无描述测试：验证描述为空时不渲染描述段落
   */
  test("does not render description when not provided", () => {
    const propsWithoutDesc: BookmarkCardProps = {
      title: "无描述书签",
      url: "https://example.com",
    };

    render(<BookmarkCard {...propsWithoutDesc} />);

    expect(screen.queryByText(/。/)).not.toBeInTheDocument();
  });

  /**
   * 可访问性测试：验证有 onClick 时卡片有正确的 role 和 tabIndex
   */
  test("has button role and is keyboard accessible when onClick is provided", () => {
    const onClick = jest.fn();
    render(<BookmarkCard {...defaultProps} onClick={onClick} />);

    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
  });
});
