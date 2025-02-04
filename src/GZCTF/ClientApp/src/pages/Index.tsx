import { Group, Stack, Title, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { RecentGameCarousel } from '@Components/RecentGameCarousel'
import { WithNavBar } from '@Components/WithNavbar'
import { showErrorNotification } from '@Utils/ApiHelper'
import { useIsMobile } from '@Utils/ThemeOverride'
import { usePageTitle } from '@Hooks/usePageTitle'
import final from '../resources/final.png'
import { mdiFlagCheckered } from '@mdi/js'
import { Icon } from '@mdi/react'
import { RecentGame } from '@Components/RecentGame'
import api, { PostInfoModel } from '@Api'
import classes from '@Styles/Index.module.css'
const Home: FC = () => {
  const { t } = useTranslation()

  const { data: posts, mutate } = api.info.useInfoGetLatestPosts({
    refreshInterval: 5 * 60 * 1000,
  })

  const { data: allGames } = api.game.useGameGamesAll({
    refreshInterval: 5 * 60 * 1000,
  })

  allGames?.sort((a, b) => new Date(a.end!).getTime() - new Date(b.end!).getTime())

  const onTogglePinned = async (post: PostInfoModel, setDisabled: (value: boolean) => void) => {
    setDisabled(true)

    try {
      const res = await api.edit.editUpdatePost(post.id, {
        title: post.title,
        isPinned: !post.isPinned,
      })
      if (post.isPinned) {
        mutate([
          ...(posts?.filter((p) => p.id !== post.id && p.isPinned) ?? []),
          { ...res.data },
          ...(posts?.filter((p) => p.id !== post.id && !p.isPinned) ?? []),
        ])
      } else {
        mutate([
          { ...res.data },
          ...(posts?.filter((p) => p.id !== post.id && p.isPinned) ?? []),
          ...(posts?.filter((p) => p.id !== post.id && !p.isPinned) ?? []),
        ])
      }
      api.info.mutateInfoGetPosts()
    } catch (e) {
      showErrorNotification(e, t)
    } finally {
      setDisabled(false)
    }
  }

  const now = new Date()
  const recentGames = [
    ...(allGames?.filter((g) => now < new Date(g.end ?? '')) ?? []),
    ...(allGames?.filter((g) => now >= new Date(g.end ?? '')).reverse() ?? []),
  ].slice(0, 3)

  const theme = useMantineTheme()
  const isMobile = useIsMobile(900)

  usePageTitle()

  return (
    <WithNavBar minWidth={0} withFooter withHeader stickyHeader>
      <Stack justify="flex-start">
        {isMobile && recentGames && recentGames.length > 0 && <RecentGameCarousel games={recentGames} />}
        <Stack align="center">
          <Group wrap="nowrap" gap={4} justify="space-between" align="flex-start" w="100%">
            <Stack className={classes.posts}>            {!isMobile && (
              <nav className={classes.wrapper}>
                <div className={classes.inner}>
                  <Stack>
                    <Group wrap="nowrap">
                      <Icon path={mdiFlagCheckered} size={1.5} color={theme.colors[theme.primaryColor][4]} />
                      <Title order={3}>{t('common.content.home.recent_games')}</Title>
                    </Group>
                    {recentGames?.map((game) => <RecentGame key={game.id} game={game} />)}
                  </Stack>
                </div>
              </nav>
            )}
            </Stack>
            {!isMobile && (
                      <img 
                        src={final} 
                          alt="背景人物" 
                        style={{ width: '800px', height: 'auto', clipPath: 'inset(0 0 0 6%)'}} // 自定义遮罩
                        draggable="false"           
                      />
            )}  
          </Group>
        </Stack>
      </Stack>
    </WithNavBar>
  )
}

export default Home
