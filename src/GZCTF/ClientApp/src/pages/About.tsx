import {Badge, Center, Group, HoverCard, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { WithNavBar } from '@Components/WithNavbar'
import { MainIcon } from '@Components/icon/MainIcon'
import { useConfig, ValidatedRepoMeta } from '@Hooks/useConfig'
import { usePageTitle } from '@Hooks/usePageTitle'
import misc from '@Styles/Misc.module.css'
import LottieAnimation from '@Components/LottieAnimation'
import animationData from '@Resources/animation.json';



const About: FC = () => {
  useConfig()
  const { valid, buildTime } = ValidatedRepoMeta()
  const { t } = useTranslation()
  usePageTitle(t('common.title.about'))

  return (
    <WithNavBar>
      <Stack justify="space-between" h="calc(100vh - 16px)">
        <Center h="calc(100vh - 16px)">
            <LottieAnimation animationData={animationData} /> {/* 使用 LottieAnimation 组件 */}
        </Center>
        <Group justify="right">
          <HoverCard shadow="md" position="top-end" withArrow openDelay={200} closeDelay={400}>
            <HoverCard.Target>
              <Badge onClick={() => window.open('https://www.ctf.icu', '_blank')} className={misc.cPointer} size="lg" variant="outline">
                云音计划
              </Badge>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack>
                <Group>
                  <MainIcon size="60px" />
                  <Stack gap="xs">
                  </Stack>
                </Group>
                <Group gap="xs">
                  <Text size="xs" fw={500} c="dimmed" ff="monospace">
                    {valid
                      ? `Built at ${buildTime.format('YYYY-MM-DDTHH:mm:ssZ')}`
                      : '修改自@GZTimeWalker GZCTF'}
                  </Text>
                </Group>
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Stack>
    </WithNavBar>
  )
}

export default About
