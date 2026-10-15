import type { Meta, StoryObj } from '@storybook/react-vite'
import cover from '../../storybook/placeholder-photo.svg'
import { Button } from '../Button/Button'
import { PodcastCard } from './PodcastCard'

const meta = {
  title: 'Organisms/PodcastCard',
  component: PodcastCard,
  args: {
    coverSrc: cover,
    date: '28.07.26',
    duration: '1год 3хв',
    title: '🏄🏻‍♀️ Episode 2: Процес найму дизайнерів в Uklon, тестові завдання, whiteboard і презентації',
    description:
      'Процес найму дизайнерів в Uklon, тестові завдання, whiteboard і презентації\n• як виглядає процес найму дизайнерів в Uklon\n• що вирізняє сильне портфоліо та CV\n• найпоширеніші помилки кандидатів\n• що оцінюють під час whiteboard-сесії та презентації рішень',
    actions: (
      <>
        <Button appearance="inverse">Spotify</Button>
        <Button appearance="inverse">YouTube</Button>
        <Button appearance="inverse">Apple Podcasts</Button>
      </>
    ),
  },
  argTypes: { actions: { control: false } },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=124-508' },
  },
} satisfies Meta<typeof PodcastCard>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
}
