import type { Meta, StoryObj } from '@storybook/react-vite'
import photo from '../../storybook/placeholder-photo.svg'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Person, Photo } from './Photo'

const meta = {
  title: 'Components/Photo',
  component: Photo,
  args: { src: photo, alt: 'Фото', shape: 'circle' },
  argTypes: {
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
    size: { control: { type: 'range', min: 48, max: 400, step: 4 } },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=69-351' },
  },
} satisfies Meta<typeof Photo>

export default meta
type Story = StoryObj<typeof meta>

export const Circle: Story = {}

export const Rounded: Story = { args: { shape: 'rounded' } }

export const PersonStory: Story = {
  name: 'Person',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=69-462' },
  },
  render: () => <Person src={photo} label="Анна @ Uklon" />,
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Person src={photo} label="Анна @ Uklon" />
    </Backgrounds>
  ),
}
