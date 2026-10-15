import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  args: {
    links: [
      { label: 'Про нас', href: '#about' },
      { label: 'Alumni клуб', href: '#alumni' },
      { label: 'Design for Monetization', href: '#monetization' },
      { label: 'Консультації', href: '#consulting' },
      { label: 'Подкаст', href: '#podcast' },
    ],
    social: [
      { label: 'Instagram', href: '#instagram' },
      { label: 'Телеграм канал', href: '#telegram' },
      { label: 'Anna Lishchynska', href: '#linkedin' },
    ],
    policies: [
      { label: 'Політика конфіденційності', href: '#privacy' },
      { label: 'Публічна оферта', href: '#offer' },
      { label: 'Політика використання Cookie', href: '#cookies' },
    ],
    copyright: '© ФОП Ліщинська А.І.',
    rights: 'Всі права захищені, 2026',
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-1049' },
  },
  decorators: [(Story) => <div style={{ paddingTop: 40 }}><Story /></div>],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
}
