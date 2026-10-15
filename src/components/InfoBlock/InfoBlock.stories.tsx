import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { InfoBlock, InfoBlocks } from './InfoBlock'

const meta = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  args: { children: 'Когорта до 7 учасників. Інтерв‘ю для відбору.' },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=73-9' },
  },
} satisfies Meta<typeof InfoBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [(Story) => <div style={{ width: 588 }}><Story /></div>],
}

const facts = [
  'Майстеркласи з дизайну, які ти до цього не вчив(-ла) на курсах.',
  'Когорта до 7 учасників. Інтерв‘ю для відбору.',
  'Закритий клуб випускників-експертів - alumni club.',
]

export const Row: Story = {
  name: 'InfoBlocks (row)',
  decorators: [(Story) => <div style={{ width: 1320 }}><Story /></div>],
  render: () => (
    <InfoBlocks>
      {facts.map((f) => (
        <InfoBlock key={f}>{f}</InfoBlock>
      ))}
    </InfoBlocks>
  ),
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <InfoBlock>{facts[1]}</InfoBlock>
    </Backgrounds>
  ),
}
