import { Anchor, Center, Divider, Stack, Text } from '@mantine/core'
import { FC } from 'react'
import { FooterRender } from '@Components/FooterRender'
import { MainIcon } from '@Components/icon/MainIcon'
import { useIsMobile } from '@Utils/ThemeOverride'
import { useConfig } from '@Hooks/useConfig'
import classes from '@Styles/AppFooter.module.css'
import logoClasses from '@Styles/LogoHeader.module.css'


export const AppFooter: FC = () => {
  const { config } = useConfig()
  const isMobile = useIsMobile()

  const copyright = (
    <Text size="sm" ta="center" fw={400} c="dimmed">
      Copyright&nbsp;©&nbsp;2022-now&nbsp;
      {isMobile && <br />}
      <Anchor href="https://github.com/GZTimeWalker" c="dimmed" size="sm" fw={500}>
        @GZTimeWalker 开源授权
      </Anchor>
      ,&nbsp;All&nbsp;Rights&nbsp;Reserved.
    </Text>
  )

  return (
    <>
      <div className={classes.spacer} />
      <div className={classes.wrapper}>
        <Center mx="auto" h="100%">

            {isMobile ? (
              <>
                {copyright}
                {config.footerInfo && <Divider />}
              </>
            ) : (
              <Divider label={copyright} labelPosition="center" />
            )}
            {config.footerInfo && <FooterRender source={config.footerInfo} />}
        </Center>
      </div>
    </>
  )
}
