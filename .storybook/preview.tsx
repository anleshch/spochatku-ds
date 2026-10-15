import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Фон сторінки (Semantic mode у Figma)',
      toolbar: {
        title: 'Тема',
        icon: 'paintbrush',
        items: [
          { value: 'pink-bg', title: 'pink-bg' },
          { value: 'beige-bg', title: 'beige-bg' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'pink-bg',
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return <Story />
    },
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
