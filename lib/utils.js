// Utility functions for BetAndPlayUSA

// Generate a random host code
export function generateHostCode() {
  const num = Math.floor(Math.random() * 10000)
  return `BAR-${String(num).padStart(3, '0')}`
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Telegram username
export function isValidTelegramUsername(username) {
  if (!username) return true // Optional field
  return /^@?[a-zA-Z0-9_]{5,32}$/.test(username)
}

// Format date for display
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Detect user's state from IP
export async function detectUserState() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.region_code || null;
  } catch {
    // Silently fail on any error (timeout, network, abort, etc)
    return null;
  }
}

// Get state name from code
export function getStateNameFromCode(code) {
  const stateNames = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
    IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
    OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
    VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia'
  }
  return stateNames[code] || code
}

// Get user's client IP address (server-side)
export async function getUserIpAddress(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  )
}

// Generate a random string for use as a code
export function generateRandomCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Check if file is valid for upload
export function isValidProofFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime']
  const maxSize = 50 * 1024 * 1024 // 50MB
  
  return {
    isValid: validTypes.includes(file.type) && file.size <= maxSize,
    errors: [
      !validTypes.includes(file.type) && `File type not supported. Allowed: JPG, PNG, WebP, MP4, MOV`,
      file.size > maxSize && `File is too large. Maximum size is 50MB`
    ].filter(Boolean)
  }
}

// Extract file name from path
export function getFileName(path) {
  return path.split('/').pop()
}

// Create CSV from data
export function generateCSV(headers, rows) {
  const csvHeaders = headers.join(',')
  const csvRows = rows.map(row => 
    headers.map(header => {
      const value = row[header]
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )
  return [csvHeaders, ...csvRows].join('\n')
}

// Check if user agreed to all required consents
export function hasAllConsents(consents) {
  return (
    consents.age === true &&
    consents.data === true &&
    consents.affiliate === true
  )
}
