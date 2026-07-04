// {{componentName}}.test.tsx.tpl
import React from 'react';
import { render, screen } from '@testing-library/react';
import { {{componentName}} } from './index';
import type { {{componentName}}Props } from './types';

/**
 * {{componentName}} 组件测试套件
 * 验证组件渲染、Props 传递等核心功能
 */
describe('{{componentName}} Component', () => {
  // 基础 Props 示例（根据组件实际场景调整）
  const defaultProps: {{componentName}}Props = {
    // 此处为占位符，实际使用时需替换为组件真实 Props
    // 示例：title: '测试标题',
    //       desc: '测试描述',
  };

  /**
   * 渲染测试：验证组件能正常挂载且无报错
   */
  test('renders the component without crashing', () => {
    const { container } = render(<{{componentName}} {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  /**
   * Props 传递测试：验证传入的 Props 能正确渲染到 DOM 中
   */
  test('displays the correct content based on props', () => {
    // 自定义测试 Props（需根据组件实际 Props 调整）
    const testProps = {
      ...defaultProps,
      // 示例：title: 'Custom Bookmark Title',
      //       url: 'https://example.com',
    };

    render(<{{componentName}} {...testProps} />);

    // 验证 Props 对应的内容存在（需根据组件实际渲染逻辑调整）
    // 示例：expect(screen.getByText(testProps.title)).toBeInTheDocument();
    //       expect(screen.getByText(testProps.url)).toBeInTheDocument();
  });
});