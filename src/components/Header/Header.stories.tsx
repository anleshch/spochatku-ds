import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header, MobileMenu, type NavItem } from './Header'

const items: NavItem[] = [
  { label: 'Подкаст', href: '#podcast' },
  { label: 'Про нас', href: '#about' },
  { label: 'Alumni клуб', href: '#alumni' },
  { label: 'Майстеркласи', href: '#masterclasses', cta: true },
]

const mobileItems: NavItem[] = [
  { label: 'Про нас', href: '#about' },
  { label: 'Alumni клуб', href: '#alumni' },
  { label: 'Подкаст', href: '#podcast' },
  { label: 'Всі майстеркласи', href: '#masterclasses' },
  { label: 'Майстерклас з монетизації', href: '#monetization' },
]

const meta = {
  title: 'Organisms/Header',
  component: Header,
  args: { items, mobileItems },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=122-1494' },
  },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
  parameters: { docs: { description: { story: 'Натисни кнопку меню, щоб відкрити MobileMenu; Escape або «×» закривають його.' } } },
}

export const Menu: Story = {
  name: 'MobileMenu (open)',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=122-1495' },
  },
  render: () => (
    <div style={{ width: 390 }}>
      <MobileMenu items={mobileItems} onClose={() => {}} />
    </div>
  ),
}
