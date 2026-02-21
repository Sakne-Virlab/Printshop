// src/lib/get-payload.ts

// Защита от импорта на клиенте — этот файл должен использоваться только на сервере
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
 * Тип для mock-объекта Payload (совместим с реальным API)
 */
type MockPayload = {
  find: (args: any) => Promise<{ docs: any[]; totalDocs: number; page: number; totalPages: number }>
  findGlobal: (args: any) => Promise<Record<string, any>>
  findByID: (args: any) => Promise<any>
  findGlobalByID: (args: any) => Promise<any>
  create: (args: any) => Promise<any>
  update: (args: any) => Promise<any>
  delete: (args: any) => Promise<any>
  updateGlobal: (args: any) => Promise<any>
}

/**
 * Создаёт mock-объект Payload для использования при сборке без БД
 */
function createMockPayload(): MockPayload {
  const emptyResponse = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
  
  return {
    find: async () => emptyResponse,
    findGlobal: async () => ({}),
    findByID: async () => null,
    findGlobalByID: async () => null,
    create: async () => null,
    update: async () => null,
    delete: async () => null,
    updateGlobal: async () => null,
  }
}

/**
 * Получение экземпляра Payload для серверных компонентов Next.js
 * 
 * 🛡️ Если DATABASE_URL не задан — возвращает mock-объект, чтобы сборка не падала
 * ✅ Использует кэшированный экземпляр для оптимизации
 * 
 * ⚠️ ВАЖНО: Эта функция должна вызываться ТОЛЬКО на сервере!
 */
export async function getPayload() {
  // Защита от вызова на клиенте
  if (!isServer) {
    throw new Error('getPayload() может быть вызван только на сервере!')
  }

  // 🛡️ Если нет DATABASE_URL — возвращаем mock, чтобы сборка в Docker не падала
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set — returning mock payload for build')
    return createMockPayload() as any
  }

  // Если экземпляр уже создан и кэширован — возвращаем его
  if (payloadInstance) {
    return payloadInstance
  }

  try {
    // Создаем новый экземпляр с реальной конфигурацией
    payloadInstance = await getPayloadClient({
      config,
    })
    return payloadInstance
  } catch (error) {
    // 🛡️ Если инициализация упала (например, БД недоступна) — возвращаем mock
    console.warn('⚠️ Failed to initialize Payload, falling back to mock:', error)
    return createMockPayload() as any
  }
}

/**
 * Глубокая очистка данных от несериализуемых свойств
 */
function deepClean(obj: any, seen = new WeakSet()): any {
  if (obj === null || obj === undefined) return null
  if (typeof obj !== 'object') return obj
  
  // Предотвращение циклических ссылок
  if (seen.has(obj)) return null
  seen.add(obj)
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClean(item, seen)).filter(item => item !== undefined)
  }
  
  const cleaned: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      
      // Пропускаем функции, символы и undefined
      if (typeof value === 'function' || typeof value === 'symbol') continue
      
      // Пропускаем специальные свойства Payload с auth-контекстом
      if (key === 'auth' || key === '_auth' || key === '__auth' || key === 'user') continue
      
      const cleanedValue = deepClean(value, seen)
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue
      }
    }
  }
  
  return cleaned
}

/**
 * Сериализация данных для передачи на клиент
 * Убирает несериализуемые свойства (функции, классы, auth контекст и т.д.)
 */
export function serializePayloadData<T>(data: T): T {
  try {
    const cleaned = deepClean(data)
    return JSON.parse(JSON.stringify(cleaned)) as T
  } catch (error) {
    console.error('Ошибка сериализации данных Payload:', error)
    try {
      return deepClean(data) as T
    } catch {
      return {} as T
    }
  }
}