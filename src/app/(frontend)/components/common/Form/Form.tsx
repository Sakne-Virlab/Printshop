'use client'

import { useState } from 'react'
import styles from './Form.module.scss'

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
  })
  const [errors, setErrors] = useState<{ phone?: string }>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validatePhone = (phone: string): boolean => {
    // Простая валидация: минимум 10 цифр
    const digitsOnly = phone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      setErrors({ phone: 'Введите корректный номер телефона' })
      return false
    }
    setErrors({})
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'phone') {
      validatePhone(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePhone(formData.phone)) {
      return
    }

    // Здесь отправка данных
    console.log('Form data:', formData)
    alert('Спасибо! Мы свяжемся с вами.')
    
    // Очистка формы
    setFormData({ name: '', phone: '', comment: '' })
  }

  return (
    <div className="container">
      <h2>Задать вопрос?</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <div className={styles.fieldsRow}>
            <div className={styles.field}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={styles.input}
                placeholder="Имя"
                required
              />
              <span className={`${styles.underline} ${focusedField === 'name' ? styles.active : ''}`} />
            </div>

            <div className={styles.field}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                placeholder="Тел"
                required
              />
              <span className={`${styles.underline} ${focusedField === 'phone' ? styles.active : ''}`} />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              onFocus={() => setFocusedField('comment')}
              onBlur={() => setFocusedField(null)}
              className={styles.textarea}
              placeholder="Комментарий"
              rows={3}
            />
            <span className={`${styles.underline} ${focusedField === 'comment' ? styles.active : ''}`} />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Отправить
        </button>
      </form>
    </div>
  )
}