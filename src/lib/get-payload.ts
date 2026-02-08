// Защита от импорта на клиенте - этот файл должен использоваться только на сервере
if (typeof window !== 'undefined') {
  throw new Error('Этот модуль может быть импортирован только на сервере!')
}

import { getPayload as getPayloadClient } from 'payload'
import config from '@/payload.config'

// Проверка, что код выполняется на сервере
const isServer = typeof window === 'undefined'

// Кэш экземпляра Payload для переиспользования
let payloadInstance: Awaited<ReturnType<typeof getPayloadClient>> | null = null

/**
 * Получение экземпляра Payload для серверных компонентов Next.js
 * Использует кэшированный экземпляр для оптимизации
 * Для публичных страниц (без аутентификации) не требуется контекст запроса
 * 
 * ⚠️ ВАЖНО: Эта функция должна вызываться ТОЛЬКО на сервере!
 */
export async function getPayload() {
  // Защита от вызова на клиенте
  if (!isServer) {
    throw new Error('getPayload() может быть вызван только на сервере!')
  }

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
 * Глубокая очистка данных от несериализуемых свойств
 * Рекурсивно удаляет функции, undefined, символы и другие несериализуемые значения
 */
function deepClean(obj: any, seen = new WeakSet()): any {
  // Обработка примитивов и null
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (typeof obj !== 'object') {
    return obj;
  }
  
  // Предотвращение циклических ссылок
  if (seen.has(obj)) {
    return null;
  }
  seen.add(obj);
  
  // Обработка массивов
  if (Array.isArray(obj)) {
    return obj.map(item => deepClean(item, seen)).filter(item => item !== undefined);
  }
  
  // Обработка объектов
  const cleaned: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      // Пропускаем функции, символы и undefined
      if (typeof value === 'function' || typeof value === 'symbol') {
        continue;
      }
      
      // Пропускаем специальные свойства Payload, которые могут содержать auth
      if (key === 'auth' || key === '_auth' || key === '__auth' || key === 'user') {
        continue;
      }
      
      // Рекурсивно очищаем вложенные объекты
      const cleanedValue = deepClean(value, seen);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
  }
  
  return cleaned;
}

/**
 * Сериализация данных для передачи на клиент
 * Убирает несериализуемые свойства (функции, классы, auth контекст и т.д.)
 * Это предотвращает ошибки при гидратации React на клиенте
 */
export function serializePayloadData<T>(data: T): T {
  try {
    // Сначала глубоко очищаем данные
    const cleaned = deepClean(data);
    // Затем сериализуем через JSON
    return JSON.parse(JSON.stringify(cleaned)) as T;
  } catch (error) {
    console.error('Ошибка сериализации данных Payload:', error);
    // Если сериализация не удалась, пытаемся вернуть хотя бы очищенные данные
    try {
      return deepClean(data) as T;
    } catch {
      // В крайнем случае возвращаем пустой объект
      return {} as T;
    }
  }
}

