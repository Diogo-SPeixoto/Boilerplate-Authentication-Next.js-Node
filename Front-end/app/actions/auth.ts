'use server'

import { FormState, SigninFormSchema, SignupFormSchema } from "@/lib/definitions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface IReturnSignin {
  errors: {
    email?: string[]
    password?: string[]
    api?: string
  }
}

interface IReturnSignup {
  errors: {
    email?: string[]
    password?: string[],
    name?: string[],
    api?: string
  }
}

export async function signup(prevState: FormState | undefined, formData: FormData): Promise<undefined | IReturnSignup> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch('http://localhost:3333/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials:"include",
      cache:"no-cache",
      body: JSON.stringify(validatedFields.data)
    })

    if(!response.ok){
      const error = await response.json()

      return {
        errors: { api: error.message}
      }
    }

    const tokens = await response.json()

    const cookieStore = await cookies()
    cookieStore.set("accessToken", tokens.accessToken)
    cookieStore.set("refreshToken", tokens.refreshToken)

  } catch (error) {

    return
  }

  redirect("/dashboard")
}


export async function signin(prevState: FormState | undefined, formData: FormData): Promise<IReturnSignin| undefined> {

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(validatedFields.data)
    })

    
    if(!response.ok){
      const error = await response.json()
      
      return {
        errors: { api: error.message}
      }
    }
    
    const tokens = await response.json()

    const cookieStore = await cookies()
    cookieStore.set("accessToken", tokens.accessToken)
    cookieStore.set("refreshToken", tokens.refreshToken)

  } catch (error) {
    console.error(error)
    return
  }

  redirect("/dashboard")
 
}