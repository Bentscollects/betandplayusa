
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  'https://pnloiztluwwzznotbejg.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc'
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const hostCode = formData.get('hostCode')

    if (!file || !hostCode) {
      return Response.json({ error: 'Missing file or host code' }, { status: 400 })
    }

    if (!supabaseAdmin) {
      throw new Error('Supabase admin client not available')
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Generate unique filename
    const fileName = `submissions/${Date.now()}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('proof-uploads')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase storage error:', error)
      throw new Error('Failed to upload file')
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('proof-uploads')
      .getPublicUrl(fileName)

    return Response.json({
      success: true,
      path: publicUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Upload proof error:', error)
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}