import { getPayload as getPayloadClient } from 'payload'
import config from '@/payload.config'

/**
 * Получение экземпляра Payload для серверных компонентов Next.js
 * Для публичных страниц (без аутентификации) достаточно передать только config
 */
export async function getPayload() {
  return getPayloadClient({
    config,
  })
}

