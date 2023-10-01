"use client"
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'text/json' }
})

setInterval(async () => {
  try {
    const response = await api.get('/');

    console.log({ data: response.data })
  } catch (error) { console.log({ error }) }

}, 1000)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
