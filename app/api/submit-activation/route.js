import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(request) {
  const errors = []

  try {
    // Debug: Log environment variables
    console.log('━━━━━━━━━━━━ ENV DEBUG ━━━━━━━━━━━━')
      // Hardcoded for reliability
      const supabase = createClient(
        'https://pnloiztluwwzznotbejg.supabase.co',
        process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
      )
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    console.log('[1/6] Parsing FormData...')
    let formData
    try {
      formData = await request.formData()
      console.log('[1/6] ✓ FormData parsed successfully')
    } catch (e) {
      const msg = `FormData parse error: ${e.message}`
      console.error(`[1/6] ✗ ${msg}`)
      errors.push(msg)
      throw e
    }

    // Extract form data with error handling for each field
    console.log('[2/6] Extracting form fields...')
    let firstName, lastName, email, hostCode, sportsbook, hostInfo, consents, files, fileNames
    try {
      firstName = formData.get('firstName')
      lastName = formData.get('lastName')
      email = formData.get('email')
      hostCode = formData.get('hostCode')
      sportsbook = formData.get('sportsbook')
      
      try {
        hostInfo = JSON.parse(formData.get('hostInfo') || '{}')
      } catch (e) {
        console.warn('hostInfo parse warning:', e.message)
        hostInfo = {}
      }
      
      try {
        consents = JSON.parse(formData.get('consents') || '{}')
      } catch (e) {
        console.warn('consents parse warning:', e.message)
        consents = {}
      }

      files = formData.getAll('files')
      fileNames = files.map(file => file.name)

      console.log('[2/6] ✓ Form fields extracted:')
      console.log('  - firstName:', firstName)
      console.log('  - lastName:', lastName)
      console.log('  - email:', email)
      console.log('  - hostCode:', hostCode)
      console.log('  - sportsbook:', sportsbook)
      console.log('  - fileNames:', fileNames)
    } catch (e) {
      const msg = `Field extraction error: ${e.message}`
      console.error(`[2/6] ✗ ${msg}`)
      errors.push(msg)
      throw e
    }

    // Validate required fields
    console.log('[3/6] Validating required fields...')
    if (!firstName || !lastName || !email || !hostCode || !sportsbook) {
      const msg = `Missing required fields: firstName=${firstName}, lastName=${lastName}, email=${email}, hostCode=${hostCode}, sportsbook=${sportsbook}`
      console.error(`[3/6] ✗ ${msg}`)
      errors.push(msg)
      throw new Error(msg)
    }
    console.log('[3/6] ✓ All required fields present')

    // Upload files to Supabase Storage
    console.log('[3.5/6] Uploading files to Supabase Storage...')
    let fileUrls = []
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnloiztluwwzznotbejg.supabase.co'
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
      
      const supabaseStorage = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false }
      })

      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        try {
          console.log(`  Uploading file ${i + 1}/${files.length}: ${file.name}`)
          
          // Convert file to buffer
          const buffer = Buffer.from(await file.arrayBuffer())
          
          // Generate unique file path
          const timestamp = Date.now()
          const filePath = `submissions/${hostCode}/${timestamp}-${i}-${file.name}`
          
          // Upload to storage
          const { data, error: uploadError } = await supabaseStorage.storage
            .from('proof-uploads')
            .upload(filePath, buffer, {
              contentType: file.type,
              upsert: false
            })
          
          if (uploadError) {
            console.warn(`  ⚠ File upload failed: ${file.name}`, uploadError.message)
            errors.push(`File upload failed: ${file.name}`)
            // Don't throw - continue with other files
            continue
          }
          
          // Get public URL
          const { data: { publicUrl } } = supabaseStorage.storage
            .from('proof-uploads')
            .getPublicUrl(filePath)
          
          fileUrls.push(publicUrl)
          console.log(`  ✓ File uploaded: ${file.name}`)
        } catch (fileError) {
          console.warn(`  ⚠ Error uploading ${file.name}:`, fileError.message)
          errors.push(`Error uploading ${file.name}: ${fileError.message}`)
          // Continue with next file
        }
      }
      
      if (fileUrls.length === 0 && files.length > 0) {
        console.warn('[3.5/6] ⚠ No files uploaded successfully, but continuing')
        // Use file names as fallback if all uploads failed
        fileUrls = fileNames
      } else if (fileUrls.length > 0) {
        console.log(`[3.5/6] ✓ Uploaded ${fileUrls.length} files successfully`)
      }
    } catch (e) {
      console.warn('[3.5/6] ⚠ File upload phase error:', e.message)
      // Don't throw - fall back to using file names
      fileUrls = fileNames
    }

    // Save to Supabase
    console.log('[4/6] Saving to Supabase submissions table...')
    let submission
    try {
      console.log('[4/6] Creating Supabase admin client...')
      
      // Use hardcoded credentials (like validate-code API does)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnloiztluwwzznotbejg.supabase.co'
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
      
      const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false }
      })

      const { data, error: dbError } = await supabaseAdmin
        .from('submissions')
        .insert({
          type: 'inperson',
          first_name: firstName,
          last_name: lastName,
          email: email,
          sportsbook: sportsbook,
          host_code: hostCode,
          state: 'Unknown',
          venue_name: hostInfo?.venue_name || 'Unknown Venue',
          file_urls: fileUrls.length > 0 ? fileUrls : fileNames,
          status: 'pending',
          consent_age: consents?.age || false,
          consent_data: consents?.data || false,
          consent_affiliate: consents?.affiliate || false
        })
        .select()

      if (dbError) {
        const msg = `Database insert error: ${dbError.message} (code: ${dbError.code})`
        console.error(`[4/6] ✗ ${msg}`)
        console.error('Full error:', dbError)
        errors.push(msg)
        throw new Error(msg)
      }

      submission = data
      console.log(`[4/6] ✓ Submission saved to database (ID: ${submission[0]?.id})`)
    } catch (e) {
      const msg = `Supabase error: ${e.message}`
      console.error(`[4/6] ✗ ${msg}`)
      errors.push(msg)
      throw e
    }

    // Send admin notification email
    console.log('[5/6] Sending admin notification email...')
    try {
      const resendKey = process.env.RESEND_API_KEY || 're_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa'
      const resend = new Resend(resendKey)
      const adminSubject = `New submission — ${sportsbook} · ${hostCode}`

      const adminEmailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'liambenton2@gmail.com',
        subject: adminSubject,
        html: `
          <h2>New Activation Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Host Code:</strong> ${hostCode}</p>
          <p><strong>Venue:</strong> ${hostInfo?.venue_name || 'Unknown Venue'}</p>
          <p><strong>Sportsbook:</strong> ${sportsbook}</p>
          <p><strong>Files:</strong> ${fileUrls.length > 0 ? fileUrls.length + ' file(s) uploaded' : 'No files'}</p>
          <p><strong>Status:</strong> pending</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `
      })

      if (adminEmailResult.error) {
        const msg = `Admin email send error: ${adminEmailResult.error.message}`
        console.error(`[5/6] ✗ ${msg}`)
        errors.push(msg)
        throw new Error(msg)
      }

      console.log(`[5/6] ✓ Admin email sent (ID: ${adminEmailResult.data?.id})`)
    } catch (e) {
      const msg = `Admin email error: ${e.message}`
      console.error(`[5/6] ✗ ${msg}`)
      errors.push(msg)
      throw e
    }

    // Send user confirmation email
    console.log('[6/6] Sending user confirmation email...')
    try {
      const resendKey = process.env.RESEND_API_KEY || 're_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa'
      const resend = new Resend(resendKey)

      const userEmailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Submission received — BetAndPlayUSA',
        html: `
          <h2>Submission Received!</h2>
          <p>Hi ${firstName},</p>
          <p>Thank you for submitting your proof of signup to BetAndPlayUSA.</p>
          <p>Your submission is currently under review. You'll receive a confirmation email within 24 hours once approved.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The BetAndPlayUSA Team</p>
        `
      })

      if (userEmailResult.error) {
        const msg = `User email send error: ${userEmailResult.error.message}`
        console.error(`[6/6] ✗ ${msg}`)
        errors.push(msg)
        throw new Error(msg)
      }

      console.log(`[6/6] ✓ User email sent (ID: ${userEmailResult.data?.id})`)
    } catch (e) {
      const msg = `User email error: ${e.message}`
      console.error(`[6/6] ✗ ${msg}`)
      errors.push(msg)
      throw e
    }

    console.log('✓✓✓ ALL STEPS COMPLETED SUCCESSFULLY ✓✓✓')

    return Response.json({
      success: true,
      message: 'Submission processed successfully',
      submissionId: submission[0]?.id
    })

  } catch (error) {
    console.error('═══════════════════════════════════════')
    console.error('SUBMISSION FAILED')
    console.error('═══════════════════════════════════════')
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('Errors encountered:', errors)
    console.error('═══════════════════════════════════════')

    return Response.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        details: errors,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
