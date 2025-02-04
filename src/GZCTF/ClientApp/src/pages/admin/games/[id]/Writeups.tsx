import { Button, Center, Group, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { mdiFolderDownloadOutline } from '@mdi/js'
import { Icon } from '@mdi/react'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { PDFViewer } from '@Components/admin/PDFViewer'
import { TeamWriteupCard } from '@Components/admin/TeamWriteupCard'
import { WithGameEditTab } from '@Components/admin/WithGameEditTab'
import { OnceSWRConfig } from '@Hooks/useConfig'
import api, { WriteupInfoModel } from '@Api'

const GameWriteups: FC = () => {
  const { id } = useParams()
  const numId = parseInt(id ?? '-1')
  const [selected, setSelected] = useState<WriteupInfoModel>()

  const { data: writeups } = api.admin.useAdminWriteups(numId, OnceSWRConfig)
  const { t } = useTranslation()

  useEffect(() => {
    if (writeups?.length && !selected) {
      setSelected(writeups[0])
    }
  }, [writeups, selected])

  return (
    <WithGameEditTab
      headProps={{ justify: 'apart' }}
      contentPos="right"
      head={
        <Button
          fullWidth
          w="15rem"
          leftSection={<Icon path={mdiFolderDownloadOutline} size={1} />}
          onClick={() => window.open(`/api/admin/writeups/${id}/all`, '_blank')}
        >
          {t('admin.button.writeups.download_all')}
        </Button>
      }
    >
      {!writeups?.length || !selected ? (
        <Center mih="calc(100vh - 180px)">
          <Stack gap={0}>
            <Title order={2}>{t('admin.content.games.writeups.empty.title')}</Title>
            <Text>{t('admin.content.games.writeups.empty.description')}</Text>
          </Stack>
        </Center>
      ) : (
        <Group wrap="nowrap" align="flex-start" justify="space-between">
          <Stack pos="relative" mt="-3rem" w="calc(100% - 120px)">
            <PDFViewer url={selected?.url} height="calc(100vh - 110px)" />
          </Stack>
          <ScrollArea miw="15rem" maw="15rem" h="calc(100vh - 110px - 3rem)" type="never">
            <Stack gap="sm">
              {writeups?.map((writeup) => (
                <TeamWriteupCard
                  key={writeup.id}
                  writeup={writeup}
                  selected={selected?.id === writeup.id}
                  onClick={() => setSelected(writeup)}
                />
              ))}
            </Stack>
          </ScrollArea>
        </Group>
      )}
    </WithGameEditTab>
  )
}

export default GameWriteups
