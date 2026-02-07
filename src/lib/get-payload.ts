import { getPayload as getPayloadClient } from 'payload'
import config from '@/payload.config'
import { headers, cookies } from 'next/headers'

/**
 * Получение экземпляра Payload для серверных компонентов Next.js
 * Передает headers и cookies для правильной работы аутентификации
 */
export async function getPayload() {
  try {
    const headersList = await headers()
    const cookiesList = await cookies()
    
    return getPayloadClient({
      config,
      headers: headersList,
      cookies: cookiesList,
    })
  } catch (error) {
    // Fallback для случаев, когда headers/cookies недоступны
    return getPayloadClient({
      config,
    })
  }
}

