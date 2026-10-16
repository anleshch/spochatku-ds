import type { Meta, StoryObj } from '@storybook/react-vite'
import { Person } from '../Photo/Photo'
import placeholder from '../../storybook/placeholder-photo.svg'
import { PageHero } from './PageHero'

const meta = {
  title: 'Organisms/PageHero',
  component: PageHero,
  args: {
    title: 'Podcast',
    description: 'Подкаст «Спочатку юікс» від Анни Ліщинської та Аріни Сергеєвої про дизайн, продукт і кар’єру.',
    people: (
      <>
        <Person src={placeholder} label="Анна" />
        <Person src={placeholder} label="Аріна" />
      </>
    ),
  },
  argTypes: { people: { control: false } },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=174-879' },
  },
} satisfies Meta<typeof PageHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutPeople: Story = { name: 'Without people', args: { people: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: { title: 'Дуже довгий заголовок сторінки-подкасту', description: 'Довгий опис. '.repeat(20) },
}
