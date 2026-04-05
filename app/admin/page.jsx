"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  function handleLogin(e) {
    e.preventDefault()
    if (email === "liambenton2@gmail.com" && password === "BetAndPlay2026!") {
      localStorage.setItem("admin_session", "true")
      router.push("/admin/overview")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <form onSubmit={handleLogin} style={{maxWidth:400,margin:"60px auto",background:"#fff",borderRadius:8,padding:32,boxShadow:"0 2px 12px #0001"}}>
      <h2 style={{color:'#0B2545',fontWeight:600,fontSize:22,marginBottom:24,textAlign:'center'}}>Admin Login</h2>
      {error && <div style={{color:'#E63946',marginBottom:16,fontSize:14}}>{error}</div>}
      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:4,fontSize:13}}>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:10,borderRadius:6,border:'1px solid #ddd',fontSize:15}} />
      </div>
      <div style={{marginBottom:24}}>
        <label style={{display:'block',marginBottom:4,fontSize:13}}>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:10,borderRadius:6,border:'1px solid #ddd',fontSize:15}} />
      </div>
      <button type="submit" style={{width:'100%',background:'#0B2545',color:'#fff',border:'none',borderRadius:6,padding:12,fontSize:16,fontWeight:600,cursor:'pointer'}}>Sign in</button>
    </form>
  )
}
