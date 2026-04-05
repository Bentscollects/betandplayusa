'use client'

import { useState } from 'react'
import { isValidEmail, isValidProofFile, hasAllConsents } from '@/lib/utils'

export default function DetailsStep({ sportsbook, onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telegramUsername: '',
    files: [],
    consents: {
      age: false,
      data: false,
      affiliate: false,
      telegram: false
    }
  })
  const [uploadErrors, setUploadErrors] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleConsentChange = (key) => {
    setFormData(prev => ({
      ...prev,
      consents: {
        ...prev.consents,
        [key]: !prev.consents[key]
      }
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadErrors([])

    const validatedFiles = []
    files.forEach(file => {
      const validation = isValidProofFile(file)
      if (validation.isValid) {
        validatedFiles.push(file)
      } else {
        setUploadErrors(prev => [...prev, `${file.name}: ${validation.errors.join(', ')}`])
      }
    })

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validatedFiles]
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(formData.email)) {
      setUploadErrors(['Please enter a valid email'])
      return
    }
    if (!hasAllConsents(formData.consents)) {
      setUploadErrors(['Please accept all three consent requirements'])
      return
    }
    if (formData.files.length < 2) {
      setUploadErrors(['Please upload at least 2 proof files'])
      return
    }
    onSubmit(formData)
  }

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    isValidEmail(formData.email) &&
    formData.files.length >= 2 &&
    formData.consents.age &&
    formData.consents.data &&
    formData.consents.affiliate

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-brand-navy shadow-lg">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">Step 3 — Your details & proof</h2>
      <p className="text-gray-600 mb-6 text-lg">
        We need your info and proof that you signed up with {sportsbook.name}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        {/* Proof Upload */}
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-2">
            Upload proof (minimum 2 files required)
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload screenshots or video of:
          </p>
          <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
            <li>New account confirmation from {sportsbook.name}</li>
            <li>Bet slip showing minimum $20 deposit and bet</li>
          </ul>

          <div className="border-2 border-dashed border-brand-navy rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📁</div>
              <p className="font-bold text-brand-navy">Drag files here or click to select</p>
              <p className="text-xs text-gray-500">JPG, PNG, WebP, MP4, MOV • Max 50MB each</p>
            </label>
          </div>

          {/* Uploaded files */}
          {formData.files.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between bg-green-50 p-3 rounded border border-green-200">
                  <span className="text-sm font-medium">✓ {file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-red-600 hover:text-red-700 text-sm font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadErrors.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadErrors.map((err, idx) => (
                <div key={idx} className="bg-red-50 border-2 border-red-300 text-red-800 px-3 py-2 rounded text-sm font-medium">
                  {err}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Telegram opt-in */}
        <div>
          <label className="block text-sm font-bold text-brand-navy mb-2">
            Telegram username (optional)
          </label>
          <input
            type="text"
            name="telegramUsername"
            value={formData.telegramUsername}
            onChange={handleInputChange}
            placeholder="@username"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: provide your Telegram username to join our betting group later
          </p>
        </div>

        {/* Consent checkboxes */}
        <div className="space-y-3 border-t border-gray-200 pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consents.age}
              onChange={() => handleConsentChange('age')}
              className="mt-1 w-5 h-5 accent-brand-red"
            />
            <span className="text-sm text-gray-700">
              I confirm I am 21 or over and physically located in the US in an eligible state
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consents.data}
              onChange={() => handleConsentChange('data')}
              className="mt-1 w-5 h-5 accent-brand-red"
            />
            <span className="text-sm text-gray-700">
              I agree to my personal data being collected and processed by BetAndPlayUSA for verification and reward purposes. Data is held for 90 days.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consents.affiliate}
              onChange={() => handleConsentChange('affiliate')}
              className="mt-1 w-5 h-5 accent-brand-red"
            />
            <span className="text-sm text-gray-700">
              I confirm this is a genuine new sportsbook account. I understand BetAndPlayUSA earns an affiliate commission on my signup.
            </span>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-brand-red text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 disabled:bg-gray-300 transition shadow-lg"
        >
          {loading ? 'Submitting...' : 'Submit proof'}
        </button>
      </form>
    </div>
  )
}
