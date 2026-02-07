import { getPayload as getPayloadClient } from 'payload'
import config from '@/payload.config'

// Кэш экземпляра Payload для переиспользования
let payloadInstance: Awaited<ReturnType<typeof getPayloadClient>> | null = null

/**
 * Получение экземпляра Payload для серверных компонентов Next.js
 * Использует кэшированный экземпляр для оптимизации
 * Для публичных страниц (без аутентификации) не требуется контекст запроса
 */
export async function getPayload() {
  // Если экземпляр уже создан, возвращаем его
  if (payloadInstance) {
    return payloadInstance
  }

  // Создаем новый экземпляр без контекста запроса (для публичных страниц)
  payloadInstance = await getPayloadClient({
    config,
  })

  return payloadInstance
}

/**
 * Сериализация данных для передачи на клиент
 * Убирает несериализуемые свойства (функции, классы и т.д.)
 * Это предотвращает ошибки при гидратации React на клиенте
 */
export function serializePayloadData<T>(data: T): T {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error('Ошибка сериализации данных Payload:', error)
    // Возвращаем данные как есть, если сериализация не удалась
    return data
  }
}

