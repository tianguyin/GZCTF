import { Box, Group, Text, Title } from '@mantine/core'
import { FC } from 'react'
import { LogoHeader } from '@Components/LogoHeader'
import { useIsMobile } from '@Utils/ThemeOverride'
import classes from '@Styles/IconHeader.module.css'

interface StickyHeaderProps {
  sticky?: boolean
  px?: string
}

export const IconHeader: FC<StickyHeaderProps> = ({ sticky, px }) => {
  const isMobile = useIsMobile()

  return isMobile ? (
    <Box h={8} />
  ) : (
    <Group
      __vars={{
        '--header-px': px || undefined,
      }}
      data-sticky={sticky || undefined}
      className={classes.group}
    >
      <LogoHeader />
    </Group>
  )
}
